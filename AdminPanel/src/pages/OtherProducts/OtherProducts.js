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

// import {
//   createTypes,
//   uploadImagetype,
//   removeType,
//   updateType,
//   getType,
// } from "../../functions/SolarType/SolarType";
import {
    getOtherProductsDetailsbyParams,getOtherProducts,updateOtherProducts,listOtherProducts,removeOtherProducts,createOtherProducts,listotherproductsbyparam,uploadproductImage
} from "../../functions/OtherProducts/OtherProducts";

const OtherProducts = () => {
  const [rolename, setrolename] = useState("");
  const [Detail, setDetail] = useState("");
//   const [roleImage, setroleimage] = useState("");
  const [cmsThumnailDesc, setcmsThumnailDesc] = useState("");
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
              body.append("uploadImage", file);
              uploadproductImage(body)
                .then((res) => {
                  console.log("res", res.url);
                  resolve({

                    default: `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/uploads/otherproductsCKImage/${res.url}`,

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
    getOtherProducts(_id)
      .then((res) => {
        console.log("ressssss", res);
        setrolename(res.ProductName);
        setDetail(res.Detail);
        // setroleimage(res.imageURL);
        // setlikes(res.likes);
        // setcomments(res.comments);
        // setcmsThumnailDesc(res.cmsThumnailDesc);
        // setViews(res.views);
        // setuserId(res.userId);
        setIsActive(res.IsActive);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setFormErrors({});
    let errors = validate(rolename, Detail);
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {
      setLoadingOption(true);
      const formdata = new FormData();

     
      formdata.append("ProductName", rolename);
      formdata.append("Detail", Detail);
    //   formdata.append("imageURL", roleImage);
      formdata.append("IsActive", IsActive);
      // formdata.append("comments", comments);
      // formdata.append("views", views);
      // formdata.append("cmsThumnailDesc", cmsThumnailDesc);
      // formdata.append("likes", likes);
      // formdata.append("userId", localStorage.getItem("RCCoffeeAdmin"));

      createOtherProducts(formdata)
        .then((res) => {
          console.log(res);
          // setmodal_list(!modal_list);
          setShowForm(false);
          setLoadingOption(false);
          // setValues(initialState);
          setDetail("");
          setrolename("");
          setlikes([]);
          setcomments([]);
          setuserId("");
          setIsActive(false);
        //   setroleimage("");
          setcmsThumnailDesc("");
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
    removeOtherProducts(remove_id)
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
    let erros = validate(rolename, Detail);
    setFormErrors(erros);
    setIsSubmit(true);
    const likesString = JSON.stringify(likes);
    const commentString = JSON.stringify(comments);

    if (Object.keys(erros).length === 0) {
      setLoadingOption(true);
      const formdata = new FormData();

    //   formdata.append("imageURL", roleImage);
      formdata.append("ProductName", rolename);
      formdata.append("Detail", Detail);
      formdata.append("IsActive", IsActive);
      // formdata.append("comments", commentString);
      // formdata.append("views", views);
      // formdata.append("cmsThumnailDesc", cmsThumnailDesc);
      // formdata.append("likes", likesString);
      // formdata.append("userId", userId);

      updateOtherProducts(_id, formdata)
        .then((res) => {
          // setmodal_edit(!modal_edit);
          setPhotoAdd("");
          setUpdateForm(false);
          setLoadingOption(false);

          setCheckImagePhoto(false);
          // setValues(initialState);
          setDetail("");
          setrolename("");
          setlikes([]);
          setcomments([]);
          setuserId("");
          setIsActive(false);
          setcmsThumnailDesc("");
          setViews(0);
        //   setroleimage("");
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

  const validate = (rolename,Detail) => {
    const errors = {};

    if (rolename === "") {
      errors.rolename = "ProductName is required!";
      setErrBT(true);
    }
    if (rolename !== "") {
      setErrBT(false);
    }

    if (Detail === "") {
      errors.Detail = "Description is required!";
      setErrBD(true);
    }
    if (Detail !== "") {
      setErrBD(false);
    }
    // if (cmsThumnailDesc === "") {

    //   errors.cmsThumnailDesc = "Thumbnail Description is required!";

    //   setErrBTD(true);
    // }
    // if (cmsThumnailDesc !== "") {
    //   setErrBTD(false);
    // }

    // if (roleImage === "") {
    //   errors.roleImage = " Image is required!";
    //   setErrBI(true);
    // }
    // if (roleImage !== "") {
    //   setErrBI(false);
    // }

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
//   const renderImage = (uploadimage) => {
//     const imageUrl = `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/${uploadimage}`;

//     return (
//       <img
//         src={imageUrl}
//         alt="Image"
//         style={{ width: "75px", height: "75px", padding: "5px" }}
//       />
//     );
//   };

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

      .post(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/listotherproductsbyparam`, {

        skip: skip,
        per_page: perPage,
        sorton: column,
        sortdir: sortDirection,
        match: query,
        IsActive: filter,
      })
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
      // setValues({ ...values, roleImage: e.target.files[0] });
    //   setroleimage(e.target.files[0]);
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
    setcmsThumnailDesc("");
    setViews(0);
    // setValues(initialState);
    setDetail("");
    setrolename("");
    setlikes([]);
    setcomments([]);
    setuserId("");
    setIsActive(false);
    // setroleimage("");
  };

  const handleUpdateCancel = (e) => {
    e.preventDefault();
    setIsSubmit(false);
    setPhotoAdd("");
    setUpdateForm(false);
    setShowForm(false);
    setcmsThumnailDesc("");
    setViews(0);
    setCheckImagePhoto(false);
    // setValues(initialState);
    setDetail("");
    setrolename("");
    setlikes([]);
    setcomments([]);
    setuserId("");
    setIsActive(false);
    // setroleimage("");
  };

  const col = [
    {
      name: "Other Products",
      cell: (row) => row.ProductName,
      sortable: true,
      sortField: "rolename",
      minWidth: "150px",
    },  {
      name: "Description",
      cell: (row) => {
        const detail = row.Detail;
        return typeof detail === 'string' ? detail.replace(/<[^>]+>/g, '') : detail;
      },
      sortable: true,
      sortField: "Detail",
      minWidth: "150px",
    },  
    // {
    //   name: "Image",
    //   cell: (row) => renderImage(row.imageURL),
    //   sortable: true,
    //   sortField: "imageURL",
    //   minWidth: "150px",
    // },

    // {
    //   name: " Written By",
    //   cell: (row) => row.adminuser,
    //   sortable: true,
    //   sortField: "adminuser",
    //   minWidth: "150px",
    // },

    // {
    //   name: "Date & Time",
    //   selector: (row) => {
    //     const dateObject = new Date(row.createdAt);

    //     return (
    //       <React.Fragment>
    //         {moment(new Date(dateObject.getTime())).format(
    //           "DD-MM-YYYY hh:mm A"
    //         )}
    //       </React.Fragment>
    //     );
    //   },
    //   sortable: true,
    //   sortField: "createdAt",
    //   minWidth: "150px",
    // },

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

  document.title = "Roles | Shreeji Pharma";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>

          <BreadCrumb title="Roles"  />


          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" lg={4} md={6} sm={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">Roles</h2>
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
                                      setDetail("");
                                      setrolename("");
                                      setlikes([]);
                                      setcomments([]);
                                      setuserId("");
                                      setIsActive(false);
                                    //   setroleimage("");
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
                                    setDetail("");
                                    setrolename("");
                                    setlikes([]);
                                    setcomments([]);
                                    setuserId("");
                                    setIsActive(false);
                                    // setroleimage("");
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
                                        key={"rolename" + _id}
                                        type="text"
                                        className={validClassBT}
                                        placeholder="Enter Name"
                                        required
                                        name="rolename"
                                        value={rolename}
                                        onChange={(e) => {
                                          setrolename(e.target.value);
                                        }}
                                      />
                                      <Label>
                                        Product Name {" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.rolename}
                                        </p>
                                      )}
                                    </div>
                                  </Col>

                                  {/* <Col lg={6}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        type="textarea"
                                        className={validClassBTD}
                                        style={{ height: "100px" }}
                                        placeholder="Remarks..."
                                        name="cmsThumnailDesc"
                                        value={cmsThumnailDesc}
                                        onChange={(e) => {
                                          setcmsThumnailDesc(e.target.value);
                                        }}
                                      />
                                      <Label className="form-label">

                                        CMS Thumbnail Description

                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.cmsThumnailDesc}
                                        </p>
                                      )}
                                    </div>
                                  </Col> */}

                                  <Col lg={12}>
                                    <Card>
                                      <Label>
                                        Description
                                        <span className="text-danger">*</span>
                                      </Label>
                                      <CardBody>
                                        {/* <Form method="post"> */}
                                        <CKEditor
                                          key={"Detail" + _id}
                                          editor={ClassicEditor}
className={validClassBD}
                                          data={Detail}
                                          config={{
                                            extraPlugins: [uploadPlugin],
                                          }}
                                          onChange={(event, editor) => {
                                            const data = editor.getData();

                                            setDetail(data);
                                            console.log(Detail);
                                          }}
                                        />
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.Detail}
                                          </p>
                                        )}
                                      </CardBody>
                                    </Card>
                                  </Col>

                                  {/* <Col lg={6}>
                                    <label>
                                      Image{" "}
                                      <span className="text-danger">*</span>
                                    </label>

                                    <Input
                                      key={"roleImage" + _id}
                                      type="file"
                                      name="roleImage"
                                      className={validClassBI}
                                      // accept="images/*"
                                      accept=".jpg, .jpeg, .png"
                                      onChange={PhotoUpload}
                                    />
                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.roleImage}
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
                                  </Col> */}

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
                                        key={"rolename" + _id}
                                        type="text"
                                        className={validClassBT}
                                        placeholder="Enter blog title"
                                        required
                                        name="rolename"
                                        value={rolename}
                                        // onChange={handleChange}
                                        onChange={(e) => {
                                          setrolename(e.target.value);
                                        }}
                                      />
                                      <Label>
                                        Product Name{" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.rolename}
                                        </p>
                                      )}
                                    </div>
                                  </Col>

                              
                                  <Col lg={12}>
                                    <Card>
                                      <Label>
                                        Description
                                        <span className="text-danger">*</span>
                                      </Label>
                                      <CardBody>
                                        {/* <Form method="post"> */}
                                        <CKEditor
                                          key={"Detail" + _id}
                                          editor={ClassicEditor}
                                          data={Detail}
                                          config={{
                                            extraPlugins: [uploadPlugin],
                                          }}
                                          onChange={(event, editor) => {
                                            const data = editor.getData();

                                            setDetail(data);
                                          }}
                                        />
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.Detail}
                                          </p>
                                        )}
                                      </CardBody>
                                    </Card>
                                  </Col>

                                  {/* <Col lg={6}>
                                    <label>
                                      Image{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <Input
                                      key={"roleImage" + _id}
                                      type="file"
                                      name="roleImage"
                                      className={validClassBI}
                                      // accept="images/*"
                                      accept=".jpg, .jpeg, .png"
                                      onChange={PhotoUpload}
                                    />
                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.roleImage}
                                      </p>
                                    )}

                                    {console.log("This is ",photoAdd)}
                                    {roleImage || photoAdd ? (
                                     

                                      <img
                                        // key={photoAdd}
                                        className="m-2"
                                        src={
                                          checkImagePhoto
                                            ? photoAdd

                                            : `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/${roleImage}`

                                        }
                                        width="180"
                                        height="200"
                                      />
                                    ) : null}
                                  </Col> */}

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
          setDetail("");
          setrolename("");
          setlikes([]);
          setcomments([]);
          setuserId("");
          setIsActive(false);
        //   setroleimage("");
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_delete(!modal_delete);
          }}
        >

          <span style={{ marginRight: "210px" }}>Remove Roles</span>

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

export default OtherProducts;
