import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { allUsersRoute, getUserAdmin, host } from "../utils/APIRoutes";
import { CURRENT_USER, getStoreJSON } from "../utils/configs";
import { Layout } from "antd";
import SilderAdminUser from "../components/SilderAdminUser";
import ChatContainer from "../components/ChatContainer";
import { AiOutlineCloseCircle,AiFillMessage } from "react-icons/ai";
const { Header, Sider } = Layout;

export interface user {
  avatarImage: string;
  id: string | number;
  role: string;
  active: boolean;
  username: string;
}

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef<any>();
  const [currentChat, setCurrentChat] = useState<user>();
  const [currentUser, setCurrentUser] = useState<user>();
  const [allUser, setAllUser] = useState<any>();
  const [isLoadInterface, setIsLoadInterface] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
 

  useEffect(() => {
    let currentUser = getStoreJSON(CURRENT_USER);
    if (currentUser) {
      if (currentUser.role === "ADMIN") {
        setIsLoadInterface(true);
      } else {
        setIsLoadInterface(false);
      }
    }
  }, []);

  useEffect(() => {
    (async function getAllUsers() {
      try {
        let getUser = await axios.get(allUsersRoute);
        let setUser = getUser?.data.map((user: user) => {
          return { ...user, active: false };
        });
        setAllUser(setUser);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!getStoreJSON(CURRENT_USER)) {
        navigate("/login");
      } else {
        setCurrentUser(await getStoreJSON(CURRENT_USER));
      }
    })();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser.id);
    }
  }, [currentUser]);

  const handleSelectUser = async (userSelect: user) => {
    if (currentUser?.role === "ADMIN") {
      let allUserNew = allUser.map((user: user) => {
        if (user.id === userSelect.id) {
          return { ...user, active: true };
        } else {
          return { ...user, active: false };
        }
      });
      setAllUser(allUserNew);
      setCurrentChat(userSelect);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        let currentUser = getStoreJSON(CURRENT_USER);
        if (currentUser.role === "USER") {
          let admin = await axios.get(getUserAdmin);
          setCurrentChat(admin.data);
        } else {
          setIsOpen(true);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <div className={isLoadInterface ? "" : "heightBoxChat"}>
        {isOpen ? (
          <Layout>
            {isLoadInterface ? (
              <Sider className="">
                <SilderAdminUser
                  arrUser={allUser}
                  handleSelectUser={handleSelectUser}
                />
              </Sider>
            ) : (
              ""
            )}
            <Layout className="bg-White">
              {isLoadInterface ? (
                <Header className="bg-slate-600 flex items-center gap-4 ">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src="https://i.pravatar.cc/300"
                      alt="..."
                      className="w-full h-full"
                    />
                  </div>
                  <p className="text-lg font-semibold text-lime-600">
                    {currentChat?.username}
                  </p>
                </Header>
              ) : (
                <Header className="bg-slate-600 flex items-center justify-between p-0 px-4 rounded-tl-xl rounded-tr-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src="https://i.pravatar.cc/300"
                        alt="..."
                        className="w-full h-full"
                      />
                    </div>
                    <p className="text-lg font-semibold text-lime-600">
                      {currentUser?.username}
                    </p>
                  </div>
                  <button className="text-3xl text-slate-100 " onClick={()=>setIsOpen(false)}>
                    <AiOutlineCloseCircle />
                  </button>
                </Header>
              )}
              <ChatContainer currentChat={currentChat} socket={socket} />
            </Layout>
          </Layout>
        ) : (
          <button className="text-4xl absolute right-4 bottom-4" onClick={() => setIsOpen(true)}>
            <AiFillMessage/>
          </button>
        )}
      </div>
    </>
  );
}
