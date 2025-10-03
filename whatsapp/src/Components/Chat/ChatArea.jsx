import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, sendMessage, updateMessage, deleteMessage } from '../../Slice/chatSlice';

const ChatArea = () => {
  const [message, setMessage] = useState('');
  const [editMessage, setEditMessage] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  
  const dispatch = useDispatch();
  const { messages, selectedUser } = useSelector(state => state.chat);
  const currentUser = useSelector(state => state.auth.user);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (currentUser && selectedUser) {
      dispatch(fetchMessages({ 
        currentUserId: currentUser.uid, 
        selectedUserId: selectedUser.id 
      }));
    }
  }, [dispatch, currentUser, selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (message.trim() && currentUser && selectedUser) {
      if (editMessage) {
        dispatch(updateMessage({ 
          messageId: editMessage.id, 
          newText: message 
        }));
        setEditMessage(null);
      } else {
        dispatch(sendMessage({
          text: message,
          senderId: currentUser.uid,
          receiverId: selectedUser.id
        }));
      }
      setMessage('');
    }
  };

  const handleEdit = (msg) => {
    setEditMessage(msg);
    setMessage(msg.text);
    setMenuAnchor(null);
  };

  const handleDelete = (messageId) => {
    dispatch(deleteMessage(messageId));
    setMenuAnchor(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!selectedUser) {
    return (
      <div className="chat-area">
        <div className="no-chat-selected">
          Select a user to start chatting
        </div>
      </div>
    );
  }

  return (
    <div className="chat-area">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="user-name">{selectedUser.displayName}</div>
        <div className="user-email">{selectedUser.email}</div>
      </div>

      {/* Messages */}
      <div className="messages-container">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.senderId === currentUser.uid ? 'sent' : 'received'}`}
          >
            <div className="message-bubble">
              {msg.text}
              <div className="message-time">
                {new Date(msg.timestamp?.toDate()).toLocaleTimeString()}
                {msg.edited && ' (edited)'}
              </div>
              
              {msg.senderId === currentUser.uid && (
                <div className="message-actions">
                  <button 
                    className="menu-btn"
                    onClick={(e) => {
                      setSelectedMessage(msg);
                      setMenuAnchor(e.currentTarget);
                    }}
                  >
                    ⋮
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Context Menu */}
      {menuAnchor && (
        <div 
          className="context-menu"
          style={{
            top: menuAnchor.getBoundingClientRect().bottom,
            left: menuAnchor.getBoundingClientRect().left
          }}
        >
          <button onClick={() => handleEdit(selectedMessage)}>Edit</button>
          <button onClick={() => handleDelete(selectedMessage.id)}>Delete</button>
        </div>
      )}

      {/* Message Input */}
      <div className="message-input-container">
        {editMessage && (
          <div className="edit-notice">
            Editing message... 
            <button 
              className="cancel-edit"
              onClick={() => {
                setEditMessage(null);
                setMessage('');
              }}
            >
              Cancel
            </button>
          </div>
        )}
        <textarea
          className="message-input"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          rows="1"
        />
        <button
          className="send-btn"
          onClick={handleSendMessage}
          disabled={!message.trim()}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default ChatArea;