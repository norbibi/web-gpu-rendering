import 'react-dropzone-uploader/dist/styles.css'

import Dropzone from 'react-dropzone-uploader'

const MySubmitButton = (props) => {
    const { className, buttonClassName, style, buttonStyle, disabled, content, onSubmit, files } = props
    const _disabled = files.some(f => ['preparing', 'getting_upload_params', 'uploading', 'headers_received', 'done'].includes(f.meta.status)) || !files.some(f => ['ready'].includes(f.meta.status))

    const handleSubmit = () => {
        onSubmit(files.filter(f => ['ready'].includes(f.meta.status)))
    }

    return (
        <div className={className} style={style}>
            <button className={buttonClassName} style={buttonStyle} onClick={handleSubmit} disabled={disabled || _disabled}>
                {content}
            </button>
        </div>
    )
}

export const MyUploader = (data) => {

    var params = {  "clientid": data.clientid,
                    "subnettag": "publlc",
                    "paymentdriver": "erc20",
                    "paymentnetwork": "goerli",
                    "memory": 8,
                    "storage": 1,
                    "threads": 4,
                    "workers": 3,
                    "budget": 1,
                    "startprice": 1000,
                    "cpuprice": 1000,
                    "envprice": 1000,
                    "timeoutglobal": 4,
                    "timeoutupload": 5,
                    "timeoutrender": 5,
                    "format": "PNG",
                    "startframe": 1,
                    "stopframe": 3,
                    "stepframe": 1}

    const getUploadParams = ({ file, meta }) => {
        const body = new FormData()
        params.idx = `"${meta.id}"`;
        params.walletaddress = '""';
        body.append('params', JSON.stringify(params))
        body.append('fileField', file)
        return {url: 'http://localhost:3001/upload', body}
    }

    const handleSubmit = (files, allFiles) => {
        data.setallfiles(allFiles);
        allFiles.forEach(f => f.restart())
    }

    return (
        <Dropzone
            getUploadParams={getUploadParams}
            onSubmit={handleSubmit}
            accept={".blend"}
            maxFiles={5}
            autoUpload={false}
            canRestart={false}
            canCancel={false}
            SubmitButtonComponent={MySubmitButton}
        />
    )
}
