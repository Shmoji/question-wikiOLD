import React from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, ContentState } from 'draft-js';
import "../../node_modules/draft-js/dist/Draft.css"; // Docs said include this for some CSS reason
import "../cssModules/RichText.css";  // All the main CSS for editor. Not using modules
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'; // withRouter lets you use this.props.history
import client from "../utils/client";

class AdminRichTE extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      editorState: EditorState.createEmpty(),
      title: '',
    };

    this.focus = () => this.refs.editor.focus();
    // Handles user typing in text editor...first time ever seeing a function created inside constructor
    this.onChange = (editorState) => this.setState( { editorState: editorState } );

    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4, /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  handleSubmit(event) {
    event.preventDefault(); // Prevent page reload

    const postData = {
      title: this.state.title,
      body: this.state.editorState.getCurrentContent().getPlainText(),
      post_date: new Date(),
      user_id: this.props.auth.user.id
    }

    client
      .post(`/api/blogpost`, postData)
      .then(res => {
        // Reset temp answer text to empty with next 2 lines of code
        const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''));
        this.setState({ editorState, title: '' });
        this.props.history.push("/");
        console.log('axios post successful');
      }) 
      .catch(err =>
        console.log('Issue posting new answer')
      );
    
  }

  onTitleChange(event) {
    this.setState( { title: event.target.value } );
  };

  render() {
    const { editorState } = this.state;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div>
        <input style={{ width: '100%' }} value={ this.state.title } onChange={ (e) => this.onTitleChange(e) } />
        <div className="RichEditor-root">
          <div className="Editor-userinfo">
            <div className="userimg">
              <img src={ process.env.PUBLIC_URL + '/images/avatar.png' } alt="MISSING img" width="40px" height="40px"></img> {/* User's image */}
            </div>
            <div className="usertxt">
              <p>{ this.props.auth.user.firstname + ' ' + this.props.auth.user.lastname }</p>
            </div>
          </div>
          <BlockStyleControls
            editorState={ editorState }
            onToggle={ this.toggleBlockType }
          />
          <InlineStyleControls
            editorState={ editorState }
            onToggle={ this.toggleInlineStyle }
          />
          <div className={ className } onClick={ this.focus }>
            <Editor
              blockStyleFn={ getBlockStyle }
              customStyleMap={ styleMap }
              editorState={ editorState }
              handleKeyCommand={ this.handleKeyCommand }
              keyBindingFn={ this.mapKeyToEditorCommand }
              onChange={ this.onChange }
              placeholder="Write a new post..."
              ref="editor"
              spellCheck={ true }
            />
          </div>
          <div className="Editor-bottombtns">
            <button onClick={ this.handleSubmit.bind(this) }>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(AdminRichTE));