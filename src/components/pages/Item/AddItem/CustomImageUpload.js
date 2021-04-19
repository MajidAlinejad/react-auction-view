import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Grid,
  Icon,
  Message,
  Segment,
  Header,
  Divider
} from 'semantic-ui-react';
import axios from 'axios';

function Uploader(props) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: ['image/jpg', 'image/jpeg'],
    multiple: false,
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
      props.uploadFile(acceptedFiles);
    }
  });

  useEffect(
    () => () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <Grid.Column width={3}>
      <section className="image-uploader">
        <div {...getRootProps({ className: 'image-uploader-dropzone' })}>
          <input {...getInputProps()} />
          <Icon name="images outline" size="huge" />
        </div>
      </section>
    </Grid.Column>
  );
}

class CustomImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.formData,
      lastId: 0,
      images: [],
      errors: [],
      selectedFile: undefined
    };
  }

  fileChanged = files => {
    this.setState(
      {
        selectedFile: files[0],
        images: [
          ...this.state.images,
          {
            id: this.state.lastId,
            url: files[0].preview,
            progress: 0
          }
        ]
      },
      () => this.uploadFile()
    );
  };

  uploadFile = () => {
    // lock form while uploading
    this.props.onChange(['lock']);

    const { errors } = this.state;
    const formData = new FormData();
    formData.append(
      'image',
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    const id = this.state.lastId;
    const filename = this.state.selectedFile.name;
    this.setState({ lastId: this.state.lastId + 1 });

    axios
      .post('post/image', formData, {
        onUploadProgress: progressEvent => {
          this.setState(prevState => ({
            images: prevState.images.map(img =>
              img.id === id
                ? Object.assign(img, {
                    progress: Math.round(
                      (progressEvent.loaded / progressEvent.total) * 100
                    )
                  })
                : img
            )
          }));
        }
      })
      .then(res => {
        this.setState(
          prevState => ({
            images: prevState.images.map(img =>
              img.id === id ? Object.assign(img, { url: res.data.upload }) : img
            )
          }),
          () => {
            this.updateFormData();
          }
        );
      })
      .catch(err => {
        this.setState(
          prevState => ({
            errors: [...errors, filename],
            images: prevState.images.filter(img => img.id !== id)
          }),
          () => {
            this.updateFormData();
          }
        );
      });
  };

  deleteImage = id => {
    this.setState(
      prevState => ({
        images: prevState.images.filter(img => img.id !== id)
      }),
      () => {
        this.updateFormData();
      }
    );
  };

  updateFormData = () => {
    const { images } = this.state;
    let uploaded = images.map(img => img.url);

    this.props.onChange(uploaded);
  };

  render() {
    const { images, errors } = this.state;

    return (
      <Segment>
        <Header as="h4">
          <Header.Content>
            عکس آگهی
            <Header.Subheader>
              افزودن عکس بازدید آگهی شما را تا سه برابر افزایش می‌دهد.
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Divider />
        <Grid stackable>
          <Grid.Row column={3}>
            {images.length < 5 ? (
              <Uploader uploadFile={this.fileChanged} />
            ) : null}
            {images.map(img => {
              return (
                <Grid.Column width={3} key={img.id}>
                  <div className="image-item">
                    <div
                      className="image-item-image"
                      style={{ backgroundImage: `url(${img.url})` }}
                    />
                    {img.progress !== 100 ? (
                      <div className="image-item-progress">
                        {img.progress + '%'}
                      </div>
                    ) : (
                      <button
                        className="image-item-delete-btn"
                        onClick={() => this.deleteImage(img.id)}
                      >
                        <Icon name="trash alternate outline" />
                      </button>
                    )}
                  </div>
                </Grid.Column>
              );
            })}
          </Grid.Row>
          {errors.length > 0 && (
            <Grid.Row>
              <Grid.Column>
                <Message
                  error
                  header="فایل های زیر به دلیل فرمت نامعتبر یا حجم بالا بارگذاری نشد:"
                  list={errors}
                />
              </Grid.Column>
            </Grid.Row>
          )}
        </Grid>
      </Segment>
    );
  }
}

export default CustomImageUpload;
