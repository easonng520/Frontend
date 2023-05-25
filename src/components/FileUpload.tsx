import { useState, useEffect } from "react";
import UploadService from "../services/upload.service";
import IFile from "../types/file.type";

const FileUpload: React.FC = () => {
  const [currentFile, setCurrentFile] = useState<File>();
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [fileInfos, setFileInfos] = useState<Array<IFile>>([]);

  useEffect(() => {
    UploadService.getFiles().then((response) => {
      setFileInfos(response.data);
    });
  }, []);

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    setCurrentFile(selectedFiles?.[0]);
    setProgress(0);
  };

  const upload = () => {
    setProgress(0);
    if (!currentFile) return;

    UploadService.upload(currentFile, (event: any) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage(response.data.message);
        return UploadService.getFiles();
      })
      .then((files) => {
        setFileInfos(files.data);
      })
      .catch((err) => {
        setProgress(0);

        if (err.response && err.response.data && err.response.data.message) {
          setMessage(err.response.data.message);
        } else {
          setMessage("Could not upload the File!");
        }

        setCurrentFile(undefined);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <label className="btn btn-default p-0">
            <input type="file" onChange={selectFile} />
          </label>
        </div>

        <div className="col-4">
          <button
            className="btn btn-success btn-sm"
            disabled={!currentFile}
            onClick={upload}
          >
            Upload
          </button>
        </div>
      </div>

      {currentFile && (
        <div className="progress my-3">
          <div
            className="progress-bar progress-bar-info"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ width: progress + "%" }}
          >
            {progress}%
          </div>
        </div>
      )}

      {message && (
        <div className="alert alert-secondary mt-3" role="alert">
          {message}
        </div>
      )}
    
      <div className="mt-3 col-md-12">
    <p >List of Photos</p>
          <div className="card-columns text-secondary">
              {fileInfos &&
            fileInfos.map((file, index) => (
           
              <div key={index} className="card ">
                <img className="card-img-top" src={file.url} alt="Card image" ></img>
                
                <a href={file.url}>{file.name}</a>
           </div>
            ))}
      
            </div>
         </div>


      
    </div>
  );
};

export default FileUpload;
