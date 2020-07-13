import React, { Component } from 'react'
import ImageUploader from 'react-images-upload'

class FileUpload extends Component {
    // bringing in this component as it is described in the documentation for the package before
    //  i see how I want to use it for right now. 

    constructor(props) {
        super(props)
         this.state = { pictures: [] }
         this.onDrop = this.onDrop.bind(this)
    }

    onDrop(picture) {
        console.log(picture)
        var tempArr = this.state.pictures 
        tempArr.push(picture)
        this.setState({
            pictures: tempArr,
        })
    }

    render() {
        return (
            <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            />
        )
    }
}

export default FileUpload