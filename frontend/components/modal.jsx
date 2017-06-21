import React from 'react'


class Modal extends React.Component{

  render(){
    if (this.props.isOpen === false)
       return null

     return (
        <div className='modal-overall-container'>
          <div className='modal-children-container' >
            {this.props.children}
          </div>
        </div>
      )
    }

  close(e) {
    e.preventDefault()
    this.props.onClose()

  }

}

export default Modal;
