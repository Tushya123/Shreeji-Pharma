import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Input,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import axios from "axios";
import DataTable from "react-data-table-component";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import {
  createBlogs,
  getBlogs,
  removeBlogs,
  updateBlogs,
  uploadImage,
} from "../../functions/Blogs/Blogs";

const Blogs = () => {
  const [Title, setTitle] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [metaURL, setMetaURL] = useState("");
  const [metaImage, setMetaImage] = useState("");
  const [Description, setDescription] = useState("");
  const [BlogImage, setBlogImage] = useState("");
  const [Category, setCategory] = useState("");
  const [views, setViews] = useState(0);

  const [loadingOption, setLoadingOption] = useState(false);

  const [likes, setlikes] = useState([]);
  const [comments, setcomments] = useState([]);
  const [userId, setuserId] = useState(localStorage.getItem("AdminUser"));
  const [IsActive, setIsActive] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);

  const [query, setQuery] = useState("");

  const [_id, set_Id] = useState("");
  const [remove_id, setRemove_id] = useState("");

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
  }, [formErrors, isSubmit]);

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file
            .then((file) => {
              body.append("uploadImg", file);
              uploadImage(body)
                .then((res) => {
                  console.log("res", res.url);
                  resolve({
                    default: `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/uploads/BlogCKImages/${res.url}`,
                  });
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => reject(err));
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  const [modal_delete, setmodal_delete] = useState(false);
  const tog_delete = (_id) => {
    setmodal_delete(!modal_delete);
    setRemove_id(_id);
  };

  const [modal_edit, setmodal_edit] = useState(false);
  const handleTog_edit = (_id) => {
    // setmodal_edit(!modal_edit);
    setIsSubmit(false);
    setUpdateForm(true);

    setIsSubmit(false);
    set_Id(_id);
    getBlogs(_id)
      .then((res) => {
        setTitle(res.Title);
        setDescription(res.Description);
        setMetaTitle(res.MetaTitle);
        setMetaDescription(res.MetaDescription);
        setMetaKeywords(res.MetaKeywords);
        setMetaURL(res.MetaURL);
        setMetaImage(res.MetaImage);
        setBlogImage(res.BlogImage);
        setCategory(res.Category);
        setIsActive(res.IsActive);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setFormErrors({});
    let errors = validate(Title, Description, BlogImage);
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {
      setLoadingOption(true);
      const formdata = new FormData();

      formdata.append("BlogImage", BlogImage);
      formdata.append("Title", Title);
      formdata.append("Description", Description);
      formdata.append("metaTitle", metaTitle);
      formdata.append("metaDescription", metaDescription);
      formdata.append("metaKeywords", metaKeywords);
      formdata.append("metaURL", metaURL);
      formdata.append("metaImage", metaImage);
      formdata.append("IsActive", IsActive);
      formdata.append("Category", Category);

      createBlogs(formdata)
        .then((res) => {
          console.log(res);
          // setmodal_list(!modal_list);
          setShowForm(false);
          setLoadingOption(false);
          // setValues(initialState);
          setDescription("");
          setTitle("");
          setMetaTitle("");
          setMetaDescription("");
          setMetaKeywords("");
          setMetaURL("");
          setMetaImage("");
          setlikes([]);
          setcomments([]);
          setuserId("");
          setIsActive(false);
          setBlogImage("");
          setCategory("");
          setViews(0);
          setIsSubmit(false);
          setCheckImagePhoto(false);
          setPhotoAdd("");
          setFormErrors({});
          fetchCategories();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    removeBlogs(remove_id)
      .then((res) => {
        setmodal_delete(!modal_delete);
        fetchCategories();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let erros = validate(Title, Description, BlogImage);
    setFormErrors(erros);
    setIsSubmit(true);
    const likesString = JSON.stringify(likes);
    const commentString = JSON.stringify(comments);

    if (Object.keys(erros).length === 0) {
      setLoadingOption(true);
      const formdata = new FormData();

      formdata.append("BlogImage", BlogImage);
      formdata.append("Title", Title);
      formdata.append("metaTitle", metaTitle);
      formdata.append("metaDescription", metaDescription);
      formdata.append("metaKeywords", metaKeywords);
      formdata.append("metaURL", metaURL);
      formdata.append("metaImage", metaImage);
      formdata.append("Description", Description);
      formdata.append("IsActive", IsActive);
      formdata.append("Category", Category);

      updateBlogs(_id, formdata)
        .then((res) => {
          // setmodal_edit(!modal_edit);
          setPhotoAdd("");
          setUpdateForm(false);
          setLoadingOption(false);

          setCheckImagePhoto(false);
          // setValues(initialState);
          setDescription("");
          setTitle("");
          setlikes([]);
          setcomments([]);
          setuserId("");
          setIsActive(false);
          setCategory("");
          setViews(0);
          setBlogImage("");
          fetchCategories();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const [errBT, setErrBT] = useState(false);
  const [errBD, setErrBD] = useState(false);
  const [errBTD, setErrBTD] = useState(false);
  const [errBI, setErrBI] = useState(false);

  const validate = (Description, Title, BlogImage) => {
    const errors = {};

    if (Title === "") {
      errors.Title = "Blog Title is required!";
      setErrBT(true);
    }
    if (Title !== "") {
      setErrBT(false);
    }

    if (Description === "") {
      errors.Description = "Blog Description is required!";
      setErrBD(true);
    }
    if (Description !== "") {
      setErrBD(false);
    }
    if (Category === "") {
      errors.Category = "Blog Category is required!";
      setErrBTD(true);
    }
    if (Category !== "") {
      setErrBTD(false);
    }

    if (BlogImage === "") {
      errors.BlogImage = "Blog Image is required!";
      setErrBI(true);
    }
    if (BlogImage !== "") {
      setErrBI(false);
    }

    return errors;
  };

  const validClassBT =
    errBT && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassBD =
    errBD && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassBTD =
    errBTD && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassBI =
    errBI && isSubmit ? "form-control is-invalid" : "form-control";

  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(0);
  const [column, setcolumn] = useState();
  const [sortDirection, setsortDirection] = useState();

  const handleSort = (column, sortDirection) => {
    setcolumn(column.sortField);
    setsortDirection(sortDirection);
  };

  useEffect(() => {
    // fetchUsers(1); // fetch page 1 of users
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [pageNo, perPage, column, sortDirection, query, filter]);

  const fetchCategories = async () => {
    setLoading(true);
    let skip = (pageNo - 1) * perPage;
    if (skip < 0) {
      skip = 0;
    }

    await axios
      .post(
        `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/Blog`,
        {
          skip: skip,
          per_page: perPage,
          sorton: column,
          sortdir: sortDirection,
          match: query,
          IsActive: filter,
        }
      )
      .then((response) => {
        if (response.length > 0) {
          let res = response[0];
          setLoading(false);
          setBlogs(res.data);
          setTotalRows(res.count);
        } else if (response.length === 0) {
          setBlogs([]);
        }
        // console.log(res);
      });

    setLoading(false);
  };

  const handlePageChange = (page) => {
    setPageNo(page);
  };

  const [photoAdd, setPhotoAdd] = useState();
  const [checkImagePhoto, setCheckImagePhoto] = useState(false);

  const PhotoUpload = (e) => {
    if (e.target.files.length > 0) {
      const image = new Image();

      let imageurl = URL.createObjectURL(e.target.files[0]);
      console.log("img", e.target.files[0]);

      setPhotoAdd(imageurl);
      // setValues({ ...values, BlogImage: e.target.files[0] });
      setBlogImage(e.target.files[0]);
      setCheckImagePhoto(true);
    }
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    // setPageNo(page);
    setPerPage(newPerPage);
  };
  const handleFilter = (e) => {
    setFilter(e.target.checked);
  };

  const handleAddCancel = (e) => {
    e.preventDefault();
    setIsSubmit(false);
    setPhotoAdd("");
    setCheckImagePhoto(false);
    setShowForm(false);
    setUpdateForm(false);
    setCategory("");
    setViews(0);
    // setValues(initialState);
    setDescription("");
    setTitle("");
    setlikes([]);
    setcomments([]);
    setuserId("");
    setIsActive(false);
    setBlogImage("");
  };

  const handleUpdateCancel = (e) => {
    e.preventDefault();
    setIsSubmit(false);
    setPhotoAdd("");
    setUpdateForm(false);
    setShowForm(false);
    setCategory("");
    setViews(0);
    setCheckImagePhoto(false);
    // setValues(initialState);
    setDescription("");
    setTitle("");
    setlikes([]);
    setcomments([]);
    setuserId("");
    setIsActive(false);
    setBlogImage("");
  };
  const stripHtmlTags = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  };
  const col = [
    {
      name: "Sr No",
      selector: (row, index) => index + 1,
      sortable: true,
      sortField: "srno",
    },
    {
      name: "Title",
      cell: (row) => row.Title,
      sortable: true,
      sortField: "Title",
      minWidth: "150px",
    },

    {
      name: "Category",
      cell: (row) => row.Category,
      sortable: true,
      sortField: "Category",
      minWidth: "150px",
    },
    {
      name: "Description",
      cell: (row) => stripHtmlTags(row.Description),
      sortable: true,
      sortField: "Description",
      minWidth: "150px",
    },

    {
      name: "Date",
      cell: (row) => {
        const dateParts = row.createdAt.split("T")[0].split("-");
        const formattedDate = `${dateParts[2]}/${
          dateParts[1]
        }/${dateParts[0].slice(-2)}`;
        return formattedDate;
      },
      sortable: true,
      sortField: "createdAt",
      minWidth: "150px",
    },
    {
      name: "Status",
      selector: (row) => {
        return <p>{row.IsActive ? "Active" : "InActive"}</p>;
      },
      sortable: false,
      sortField: "Status",
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <React.Fragment>
            <div className="d-flex gap-2">
              <div className="edit">
                <button
                  className="btn btn-sm btn-success edit-item-btn "
                  data-bs-toggle="modal"
                  data-bs-target="#showModal"
                  onClick={() => handleTog_edit(row._id)}
                >
                  Edit
                </button>
              </div>

              <div className="remove">
                <button
                  className="btn btn-sm btn-danger remove-item-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteRecordModal"
                  onClick={() => tog_delete(row._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </React.Fragment>
        );
      },
      sortable: false,
      minWidth: "180px",
    },
  ];

  document.title = "Blogs | Shreeji Pharma";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb maintitle="Blogs" title="Blogs" pageTitle="Master" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" lg={4} md={6} sm={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">Blogs</h2>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      <div
                        style={{
                          display: showForm || updateForm ? "none" : "",
                        }}
                      >
                        <div className="text-end mt-1">
                          <Input
                            type="checkbox"
                            className="form-check-input"
                            name="filter"
                            value={filter}
                            defaultChecked={true}
                            onChange={handleFilter}
                          />
                          <Label className="form-check-label ms-2">
                            Active
                          </Label>
                        </div>
                      </div>
                    </Col>
                    <Col className="col-sm-auto" lg={4} md={12} sm={12}>
                      <div className="d-flex justify-content-sm-end">
                        {/* add btn */}
                        <div
                          style={{
                            display: showForm || updateForm ? "none" : "",
                          }}
                        >
                          <Row>
                            <Col lg={12}>
                              <div className="d-flex justify-content-sm-end">
                                <div>
                                  <Button
                                    color="success"
                                    className="add-btn me-1"
                                    onClick={() => {
                                      setShowForm(!showForm);
                                      // setValues(initialState);
                                      setDescription("");
                                      setTitle("");
                                      setlikes([]);
                                      setcomments([]);
                                      setuserId("");
                                      setIsActive(false);
                                      setBlogImage("");
                                      // setFileId(Math.random() * 100000);
                                    }}
                                    // onClick={() => tog_list()}
                                    // id="create-btn"
                                  >
                                    <i className="ri-add-line align-bottom me-1"></i>
                                    Add
                                  </Button>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>

                        {/* update list btn */}

                        <div
                          style={{
                            display: showForm || updateForm ? "" : "none",
                          }}
                        >
                          <Row>
                            <Col lg={12}>
                              <div className="text-end">
                                <button
                                  className="btn bg-success text-light mb-3 "
                                  onClick={() => {
                                    // setValues(initialState);
                                    setDescription("");
                                    setTitle("");
                                    setlikes([]);
                                    setcomments([]);
                                    setuserId("");
                                    setIsActive(false);
                                    setBlogImage("");
                                    setShowForm(false);
                                    setUpdateForm(false);
                                    // setFileId(Math.random() * 100000);
                                  }}
                                >
                                  <i class="ri-list-check align-bottom me-1"></i>{" "}
                                  List
                                </button>
                              </div>
                            </Col>
                          </Row>
                          {/* </div> */}
                        </div>

                        {/* search */}
                        <div
                          className="search-box ms-2"
                          style={{
                            display: showForm || updateForm ? "none" : "",
                          }}
                        >
                          <input
                            className="form-control search"
                            placeholder="Search..."
                            onChange={(e) => setQuery(e.target.value)}
                          />
                          <i className="ri-search-line search-icon "></i>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>

                {/* ADD FORM  */}
                <div
                  style={{
                    display: showForm && !updateForm ? "block" : "none",
                  }}
                >
                  <CardBody>
                    <React.Fragment>
                      <Col xxl={12}>
                        <Card className="">
                          {/* <PreviewCardHeader title="Billing Product Form" /> */}
                          <CardBody>
                            <div className="live-preview">
                              <Form>
                                <Row>
                                  <Col lg={6}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        key={"Title_" + _id}
                                        type="text"
                                        className={validClassBT}
                                        placeholder="Enter blog title"
                                        required
                                        name="Title"
                                        value={Title}
                                        onChange={(e) => {
                                          setTitle(e.target.value);
                                        }}
                                      />
                                      <Label>
                                        Blog Title{" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.Title}
                                        </p>
                                      )}
                                    </div>
                                  </Col>

                                  <Col lg={6}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        type="text"
                                        className={validClassBTD}
                                        placeholder="Blog Category"
                                        name="Category"
                                        value={Category}
                                        onChange={(e) => {
                                          setCategory(e.target.value);
                                        }}
                                      />
                                      <Label className="form-label">
                                        Blog Category
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.Category}
                                        </p>
                                      )}
                                    </div>
                                  </Col>

                                  <Col lg={4}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        type="text"
                                        className="form-control"
                                        placeholder="Meta Title"
                                        name="metaTitle"
                                        value={metaTitle}
                                        onChange={(e) => {
                                          setMetaTitle(e.target.value);
                                        }}
                                      />
                                      <Label className="form-label">
                                        Meta Title
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.metaTitle}
                                        </p>
                                      )}
                                    </div>
                                  </Col>

                                  <Col lg={4}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        type="text"
                                        className="form-control"
                                        placeholder="Meta Description"
                                        name="metaDescription"
                                        value={metaDescription}
                                        onChange={(e) => {
                                          setMetaDescription(e.target.value);
                                        }}
                                      />
                                      <Label className="form-label">
                                        Meta Description
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.metaDescription}
                                        </p>
                                      )}
                                    </div>
                                  </Col>

                                  <Col lg={4}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        type="text"
                                        className="form-control"
                                        placeholder="Meta Keywords"
                                        name="metaKeywords"
                                        value={metaKeywords}
                                        onChange={(e) => {
                                          setMetaKeywords(e.target.value);
                                        }}
                                      />
                                      <Label className="form-label">
                                        Meta Keywords
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.metaKeywords}
                                        </p>
                                      )}
                                    </div>
                                  </Col>

                                  <Col lg={6}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        type="text"
                                        className="form-control"
                                        placeholder="Meta URL"
                                        name="metaURL"
                                        value={metaURL}
                                        onChange={(e) => {
                                          setMetaURL(e.target.value);
                                        }}
                                      />
                                      <Label className="form-label">
                                        Meta URL
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.metaURL}
                                        </p>
                                      )}
                                    </div>
                                  </Col>

                                  <Col lg={6}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        type="text"
                                        className="form-control"
                                        placeholder="Meta Image"
                                        name="metaImage"
                                        value={metaImage}
                                        onChange={(e) => {
                                          setMetaImage(e.target.value);
                                        }}
                                      />
                                      <Label className="form-label">
                                        Meta Image
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.metaImage}
                                        </p>
                                      )}
                                    </div>
                                  </Col>

                                  <Col lg={12}>
                                    <Card>
                                      <Label>
                                        Blog Description
                                        <span className="text-danger">*</span>
                                      </Label>
                                      <CardBody>
                                        {/* <Form method="post"> */}
                                        <CKEditor
                                          key={"Description_" + _id}
                                          editor={ClassicEditor}
                                          data={Description}
                                          config={{
                                            extraPlugins: [uploadPlugin],
                                          }}
                                          onChange={(event, editor) => {
                                            const data = editor.getData();

                                            setDescription(data);
                                            console.log(Description);
                                          }}
                                        />
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.Description}
                                          </p>
                                        )}
                                      </CardBody>
                                    </Card>
                                  </Col>

                                  <Col lg={6}>
                                    <label>
                                      Blog Image{" "}
                                      <span className="text-danger">*</span>
                                    </label>

                                    <Input
                                      key={"BlogImage_" + _id}
                                      type="file"
                                      name="BlogImage"
                                      className={validClassBI}
                                      // accept="images/*"
                                      accept=".jpg, .jpeg, .png"
                                      onChange={PhotoUpload}
                                    />
                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.BlogImage}
                                      </p>
                                    )}
                                    {checkImagePhoto ? (
                                      <img
                                        //   src={image ?? myImage}
                                        className="m-2"
                                        src={photoAdd}
                                        alt="Profile"
                                        width="180"
                                        height="200"
                                      />
                                    ) : null}
                                  </Col>

                                  <div className="mt-5">
                                    <Col lg={6}>
                                      <div className="form-check mb-2">
                                        <Input
                                          key={"IsActive_" + _id}
                                          type="checkbox"
                                          name="IsActive"
                                          value={IsActive}
                                          // onChange={handleCheck}
                                          onChange={(e) => {
                                            setIsActive(e.target.checked);
                                          }}
                                          checked={IsActive}
                                        />
                                        <Label
                                          className="form-check-label"
                                          htmlFor="activeCheckBox"
                                        >
                                          Is Active
                                        </Label>
                                      </div>
                                    </Col>
                                  </div>

                                  {loadingOption && (
                                    <div className="d-flex justify-content-center">
                                      <div
                                        className="spinner-border"
                                        role="status"
                                      >
                                        <span className="sr-only">
                                          Loading...
                                        </span>
                                      </div>
                                      <h6 className="p-2">
                                        Wait for a few seconds.This process
                                        might take some time.
                                      </h6>
                                    </div>
                                  )}

                                  <Col lg={12}>
                                    <div className="hstack gap-2 justify-content-end">
                                      <button
                                        type="submit"
                                        className="btn btn-success  m-1"
                                        id="add-btn"
                                        onClick={handleClick}
                                      >
                                        Submit
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-outline-danger m-1"
                                        onClick={handleAddCancel}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </Col>
                                </Row>
                              </Form>
                            </div>
                          </CardBody>{" "}
                        </Card>
                      </Col>
                    </React.Fragment>
                  </CardBody>
                </div>

                {/* UPDATE FORM  */}
                <div
                  style={{
                    display: !showForm && updateForm ? "block" : "none",
                  }}
                >
                  <CardBody>
                    <React.Fragment>
                      <Col xxl={12}>
                        <Card className="">
                          <CardBody>
                            <div className="live-preview">
                              <Form>
                                <Row>
                                  <Col lg={6}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        key={"Title_" + _id}
                                        type="text"
                                        className={validClassBT}
                                        placeholder="Enter blog title"
                                        required
                                        name="Title"
                                        value={Title}
                                        // onChange={handleChange}
                                        onChange={(e) => {
                                          setTitle(e.target.value);
                                        }}
                                      />
                                      <Label>
                                        Blog Title{" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.Title}
                                        </p>
                                      )}
                                    </div>
                                  </Col>

                                  <Col lg={6}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        type="text"
                                        className={validClassBTD}
                                        placeholder="Remarks..."
                                        name="Category"
                                        value={Category}
                                        onChange={(e) => {
                                          setCategory(e.target.value);
                                        }}
                                      />
                                      <Label className="form-label">
                                        Blog Category
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.Category}
                                        </p>
                                      )}
                                    </div>
                                  </Col>

                                  <Col lg={4}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        type="text"
                                        className="form-control"
                                        placeholder="Meta Title"
                                        name="metaTitle"
                                        value={metaTitle}
                                        onChange={(e) => {
                                          setMetaTitle(e.target.value);
                                        }}
                                      />
                                      <Label className="form-label">
                                        Meta Title
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.metaTitle}
                                        </p>
                                      )}
                                    </div>
                                  </Col>

                                  <Col lg={4}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        type="text"
                                        className="form-control"
                                        placeholder="Meta Description"
                                        name="metaDescription"
                                        value={metaDescription}
                                        onChange={(e) => {
                                          setMetaDescription(e.target.value);
                                        }}
                                      />
                                      <Label className="form-label">
                                        Meta Description
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.metaDescription}
                                        </p>
                                      )}
                                    </div>
                                  </Col>

                                  <Col lg={4}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        type="text"
                                        className="form-control"
                                        placeholder="Meta Keywords"
                                        name="metaKeywords"
                                        value={metaKeywords}
                                        onChange={(e) => {
                                          setMetaKeywords(e.target.value);
                                        }}
                                      />
                                      <Label className="form-label">
                                        Meta Keywords
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.metaKeywords}
                                        </p>
                                      )}
                                    </div>
                                  </Col>

                                  <Col lg={6}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        type="text"
                                        className="form-control"
                                        placeholder="Meta URL"
                                        name="metaURL"
                                        value={metaURL}
                                        onChange={(e) => {
                                          setMetaURL(e.target.value);
                                        }}
                                      />
                                      <Label className="form-label">
                                        Meta URL
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.metaURL}
                                        </p>
                                      )}
                                    </div>
                                  </Col>

                                  <Col lg={6}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        type="text"
                                        className="form-control"
                                        placeholder="Meta Image"
                                        name="metaImage"
                                        value={metaImage}
                                        onChange={(e) => {
                                          setMetaImage(e.target.value);
                                        }}
                                      />
                                      <Label className="form-label">
                                        Meta Image
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.metaImage}
                                        </p>
                                      )}
                                    </div>
                                  </Col>
                                  <Col lg={12}>
                                    <Card>
                                      <Label>
                                        Blog Description
                                        <span className="text-danger">*</span>
                                      </Label>
                                      <CardBody>
                                        {/* <Form method="post"> */}
                                        <CKEditor
                                          key={"Description_" + _id}
                                          editor={ClassicEditor}
                                          data={Description}
                                          config={{
                                            extraPlugins: [uploadPlugin],
                                          }}
                                          onChange={(event, editor) => {
                                            const data = editor.getData();

                                            setDescription(data);
                                          }}
                                        />
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.Description}
                                          </p>
                                        )}
                                      </CardBody>
                                    </Card>
                                  </Col>

                                  <Col lg={6}>
                                    <label>
                                      Blog Image{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <Input
                                      key={"BlogImage_" + _id}
                                      type="file"
                                      name="BlogImage"
                                      className={validClassBI}
                                      // accept="images/*"
                                      accept=".jpg, .jpeg, .png"
                                      onChange={PhotoUpload}
                                    />
                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.BlogImage}
                                      </p>
                                    )}

                                    {BlogImage || photoAdd ? (
                                      <img
                                        // key={photoAdd}
                                        className="m-2"
                                        src={
                                          checkImagePhoto
                                            ? photoAdd
                                            : `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/${BlogImage}`
                                        }
                                        width="180"
                                        height="200"
                                      />
                                    ) : null}
                                  </Col>

                                  <div className="mt-5">
                                    <Col lg={6}>
                                      <div className="form-check mb-2">
                                        <Input
                                          key={"IsActive_" + _id}
                                          type="checkbox"
                                          name="IsActive"
                                          value={IsActive}
                                          onChange={(e) => {
                                            setIsActive(e.target.checked);
                                          }}
                                          checked={IsActive}
                                        />
                                        <Label
                                          className="form-check-label"
                                          htmlFor="activeCheckBox"
                                        >
                                          Is Active
                                        </Label>
                                      </div>
                                    </Col>
                                  </div>

                                  {loadingOption && (
                                    <div className="d-flex justify-content-center">
                                      <div
                                        className="spinner-border"
                                        role="status"
                                      >
                                        <span className="sr-only">
                                          Loading...
                                        </span>
                                      </div>
                                      <h6 className="p-2">
                                        Wait for a few seconds.This process
                                        might take some time.
                                      </h6>
                                    </div>
                                  )}

                                  <Col lg={12}>
                                    <div className="text-end">
                                      <button
                                        type="submit"
                                        className=" btn btn-success m-1"
                                        id="add-btn"
                                        onClick={handleUpdate}
                                      >
                                        Update
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-outline-danger m-1"
                                        onClick={handleUpdateCancel}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </Col>
                                </Row>
                              </Form>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    </React.Fragment>
                  </CardBody>
                </div>

                {/* list */}
                <div
                  style={{
                    display: showForm || updateForm ? "none" : "block",
                  }}
                >
                  <CardBody>
                    <div>
                      <div className="table-responsive table-card mt-1 mb-1 text-right">
                        <DataTable
                          columns={col}
                          data={blogs}
                          progressPending={loading}
                          sortServer
                          onSort={(column, sortDirection, sortedRows) => {
                            handleSort(column, sortDirection);
                          }}
                          pagination
                          paginationServer
                          paginationTotalRows={totalRows}
                          paginationRowsPerPageOptions={[
                            10,
                            50,
                            100,
                            totalRows,
                          ]}
                          onChangeRowsPerPage={handlePerRowsChange}
                          onChangePage={handlePageChange}
                        />
                      </div>
                    </div>
                  </CardBody>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/*Remove Modal*/}
      <Modal
        isOpen={modal_delete}
        toggle={() => {
          tog_delete();
          // setValues([]);
          setDescription("");
          setTitle("");
          setlikes([]);
          setcomments([]);
          setuserId("");
          setIsActive(false);
          setBlogImage("");
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_delete(!modal_delete);
          }}
        >
          <span style={{ marginRight: "210px" }}>Remove Blog</span>
        </ModalHeader>

        <form>
          <ModalBody>
            <div className="mt-2 text-center">
              <lord-icon
                src="https://cdn.lordicon.com/gsqxdxog.json"
                trigger="loop"
                colors="primary:#f7b84b,secondary:#f06548"
                style={{ width: "100px", height: "100px" }}
              ></lord-icon>
              <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                <h4>Are you sure ?</h4>
                <p className="text-muted mx-4 mb-0">
                  Are you Sure You want to Remove this Record ?
                </p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="submit"
                className="btn btn-danger"
                id="add-btn"
                onClick={handleDelete}
              >
                Remove
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => setmodal_delete(false)}
              >
                Close
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default Blogs;
