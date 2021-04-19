import React, { Component } from "react";
import {
  Grid,
  Button,
  Label,
  Form,
  Progress,
  Message
} from "semantic-ui-react";
import Axios from "axios";
import ShowErrors from "../../../ShowErrors";
import { connect } from "react-redux";
import { getUser } from "../../../../actions/user";

class Document extends Component {
  state = {
    errors: [],
    document: undefined,
    selectedFile: undefined,
    progress: 0,
    success: false,
    documents: {
      cart_meli: [],
      shenase: [],
      contract: [],
      etc: []
    }
  };

  updateDoc(documents) {
    this.setState({
      documents: {
        cart_meli: documents.filter(doc => doc.type === "کارت ملی")[0]
          ? documents.filter(doc => doc.type === "کارت ملی")[0]
          : [],
        shenase: documents.filter(doc => doc.type === "کارت ملی")[0]
          ? documents.filter(doc => doc.type === "شناسنامه")[0]
          : [],
        contract: documents.filter(doc => doc.type === "کارت ملی")[0]
          ? documents.filter(doc => doc.type === "قرارداد")[0]
          : [],
        etc: documents.filter(doc => doc.type === "کارت ملی")[0]
          ? documents.filter(doc => doc.type === "سایر")[0]
          : []
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.documents !== this.props.documents) {
      this.updateDoc(nextProps.documents);
    }
  }
  componentDidMount() {
    this.updateDoc(this.props.documents);
  }

  fileChanged = (files, doc_type) => {
    this.setState(
      {
        progress: 0,
        success: false,
        selectedFile: files[0]
      },
      () => this.uploadFile(doc_type)
    );
  };

  uploadFile = doc_type => {
    const formData = new FormData();
    formData.append(
      "document",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    formData.append("type", doc_type);

    Axios.post("user/document", formData, {
      onUploadProgress: progressEvent => {
        this.setState({
          progress: Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          )
        });
      }
    })
      .then(res => {
        this.setState({ success: true }, () => {
          this.props.getUser();
        });
      })
      .catch(err => {
        this.setState({
          progress: 0,
          success: false,
          errors: err.response.data.errors
        });
      });
  };

  render() {
    const { documents } = this.state;
    return (
      <React.Fragment>
        {this.state.errors.length ? (
          <ShowErrors errors={this.state.errors} />
        ) : (
          ""
        )}

        <Message
          hidden={!this.state.success}
          id="MessCenter"
          info
          size="small"
          header="آپلود مدرک موفقیت آمیز بود"
          className="fadeIn animated fast"
        />
        <Progress
          attached="top"
          color="blue"
          percent={this.state.progress}
          indicating
          size="tiny"
          className={"prgs-" + this.state.progress}
        />

        <Grid celled className="grid-table fadeIn animated fast">
          <Grid.Row columns={3}>
            <Grid.Column textAlign="center" className="bolder">
              نوع
            </Grid.Column>
            <Grid.Column textAlign="center" className="bolder">
              وضعیت
            </Grid.Column>
            <Grid.Column textAlign="center" className="bolder">
              انتخاب مدرک
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column textAlign="center" className="bolder">
              کارت ملی
            </Grid.Column>
            <Grid.Column textAlign="center">
              {documents.cart_meli ? (
                documents.cart_meli.verified === 1 ? (
                  <Label as="a" basic color="green">
                    تایید شده
                  </Label>
                ) : (
                  <Label as="a" basic color="teal">
                    در انتظار تایید
                  </Label>
                )
              ) : (
                <Label as="a" basic color="red">
                  مدرکی بارگزاری نشده
                </Label>
              )}
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Field className="compact">
                  <input
                    name="document"
                    type="file"
                    className="fileIpt"
                    onChange={e => this.fileChanged(e.target.files, "کارت ملی")}
                  />
                  <Button fluid className="fileBtn" as="a" color="blue">
                    آپلود
                  </Button>
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={3}>
            <Grid.Column textAlign="center" className="bolder">
              شناسنامه
            </Grid.Column>
            <Grid.Column textAlign="center">
              {documents.shenase ? (
                documents.shenase.verified === 1 ? (
                  <Label as="a" basic color="green">
                    تایید شده
                  </Label>
                ) : (
                  <Label as="a" basic color="teal">
                    در انتظار تایید
                  </Label>
                )
              ) : (
                <Label as="a" basic color="red">
                  مدرکی بارگزاری نشده
                </Label>
              )}
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Field className="compact">
                  <input
                    name="document"
                    type="file"
                    className="fileIpt"
                    onChange={e => this.fileChanged(e.target.files, "شناسنامه")}
                  />
                  <Button fluid className="fileBtn" as="a" color="blue">
                    آپلود
                  </Button>
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={3}>
            <Grid.Column textAlign="center" className="bolder">
              تصویر قرارداد
            </Grid.Column>
            <Grid.Column textAlign="center">
              {documents.contract ? (
                documents.contract.verified === 1 ? (
                  <Label as="a" basic color="green">
                    تایید شده
                  </Label>
                ) : (
                  <Label as="a" basic color="teal">
                    در انتظار تایید
                  </Label>
                )
              ) : (
                <Label as="a" basic color="red">
                  مدرکی بارگزاری نشده
                </Label>
              )}
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Field className="compact">
                  <input
                    name="document"
                    type="file"
                    className="fileIpt"
                    onChange={e =>
                      this.fileChanged(e.target.files, "تصویر قرارداد")
                    }
                  />
                  <Button fluid className="fileBtn" as="a" color="blue">
                    آپلود
                  </Button>
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={3}>
            <Grid.Column textAlign="center" className="bolder">
              سایر
            </Grid.Column>
            <Grid.Column textAlign="center">
              {documents.etc ? (
                documents.etc.verified === 1 ? (
                  <Label as="a" basic color="green">
                    تایید شده
                  </Label>
                ) : (
                  <Label as="a" basic color="teal">
                    در انتظار تایید
                  </Label>
                )
              ) : (
                <Label as="a" basic color="red">
                  مدرکی بارگزاری نشده
                </Label>
              )}
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Field className="compact">
                  <input
                    name="document"
                    type="file"
                    className="fileIpt"
                    onChange={e => this.fileChanged(e.target.files, "سایر")}
                  />
                  <Button fluid className="fileBtn" as="a" color="blue">
                    آپلود
                  </Button>
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    documents: state.user.documents
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(getUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Document);
