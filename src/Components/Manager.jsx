import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";


const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();

  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);
  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    console.log(passwords)
    setpasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);
  const showPassword = () => {
    passwordRef.current.type = "text";
    console.log(ref.current.src);
    if (ref.current.src.includes("icons/eye-slash-solid.svg")) {
      ref.current.src = "icons/eye-solid.svg";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/eye-slash-solid.svg";
      passwordRef.current.type = "text";
    }
  };
  const savePassword = async() => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({id:form.id})})
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      await fetch("http://localhost:3000/",{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({...form,id:uuidv4()})})
      //localStorage.setItem("passwords",JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
      //console.log([...passwordArray, form]);
      setForm({ site: "", username: "", password: "" });
      toast("Password saved! ", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Error:Not saved", {
        autoClose: 500,
      });
    }
  };
  const deletePassword = async(id) => {
    console.log("Deleting id", id);
    let c = confirm("Do you really want to delete this password");
    if (c) setpasswordArray(passwordArray.filter((item) => item.id !== id));
    let res=await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({id})})
    //localStorage.setItem("passwords",JSON.stringify(passwordArray.filter((item) => item.id !== id)));
    toast("Deleted ", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    console.log([...passwordArray, form]);
  };

  const editPassword = (id) => {
    console.log("Editing id", id);
    setForm({...passwordArray.filter((i) => i.id == id)[0],id:id});
    setpasswordArray(passwordArray.filter((item) => item.id !== id));

    /* localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    console.log([...passwordArray, form]); */
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const copyText = (text) => {
    toast("🦄 Copied to clipboard", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition=" Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="p-3 pt-2 md:p-0 md:mycontainer min-h-[79.5vh] ">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Pass<span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>
        <div className=" flex flex-col px-4 py-1 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            className="rounded-full border border-green-500 w-full px-4"
            type="text"
            name="site"
            id="site"
            placeholder="Enter Website URL"
          />
          <div className="flex flex-col md:flex-row w-full gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              className="rounded-full border border-green-500 w-full px-4"
              type="text"
              name="username"
              id="username"
              placeholder="Enter Username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                className="rounded-full border border-green-500 w-full px-4"
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
              />
              <span className="absolute right-[1px] cursor-pointer ">
                <img
                  className="p-1"
                  onClick={showPassword}
                  ref={ref}
                  width={30}
                  src="icons/eye-solid.svg"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            className="flex justify-center items-center  bg-green-600  hover:bg-green-500 rounded-full px-8 gap-2 py-2  
          w-fit border border-green-900"
            onClick={savePassword}
          >
            <FontAwesomeIcon icon="fa-solid fa-plus" />
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className=" bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100 ">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center ">
                        <div className="flex items-center justify-center">
                          <a>{item.site}</a>
                          <div
                            className="w-4 cursor-pointer "
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <img
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="icons/copy-solid.svg"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center ">
                        <div className="flex items-center justify-center">
                          <a>{item.username}</a>
                          <div
                            className="w-4 cursor-pointer "
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <img
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="icons/copy-solid.svg"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center  ">
                        <div className="flex items-center justify-center">
                          <a>{"*".repeat(item.password.length)}</a>
                          <div
                            className="w-4 cursor-pointer hover:border hover:border-green-800"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <img
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="icons/copy-solid.svg"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center flex items-center justify-center gap-2">
                        <span
                          className="cursor-pointer w-5"
                          onClick={() => editPassword(item.id)}
                        >
                          <img
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="icons/pen-solid.svg"
                            alt=""
                          />
                        </span>
                        <span
                          className="cursor-pointer w-5 mx-1"
                          onClick={() => deletePassword(item.id)}
                        >
                          <img
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="icons/trash-solid.svg"
                            alt=""
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
