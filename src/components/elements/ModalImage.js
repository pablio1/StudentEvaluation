import React, {Component} from "react";

export default class ModalImage extends Component {  
    closeModal = () => {
        this.props.handleOnCloseImageModal();
    }
    render() {
        const { documentPath , showImageModal } = this.props;
        return (
            <div className={"modal " + (showImageModal ?  "is-active " : "")}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <figure className="image is-2by3 is-fullwidth">
                        <img src={documentPath} alt="" />
                    </figure>   
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={this.closeModal}></button>
            </div>     
        );
    }
}