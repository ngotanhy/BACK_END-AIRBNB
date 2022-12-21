import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { Layout } from "antd";
import { AiOutlineCloseCircle, AiFillMessage } from "react-icons/ai";
import { CURRENT_USER, getStoreJSON } from "../utils/configs";
import { allUsersRoute, getUserAdmin, host } from "../utils/APIRoutes";
import SilderAdminUser from "../components/SilderAdminUser";
import ChatContainer from "../components/ChatContainer";

const { Header, Sider } = Layout;

export interface user {
  avatarImage: string;
  id: string | number;
  role: string;
  active: boolean;
  username: string;
}

type ArrUser = user[];

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef<any>();
  const [currentChat, setCurrentChat] = useState<user | null>(null);
  const [currentUser, setCurrentUser] = useState<user>();
  const [allUser, setAllUser] = useState<ArrUser | null>(null);
  const [isLoadInterface, setIsLoadInterface] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    let currentUser = getStoreJSON(CURRENT_USER);
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser.id);
    }
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
        if (getUser) {
          let setUser = getUser?.data.content.map((user: user) => {
            return { ...user, active: false };
          });
          setAllUser(setUser);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (getStoreJSON(CURRENT_USER)) {
        setCurrentUser(await getStoreJSON(CURRENT_USER));
      }
    })();
  }, []);

  // useEffect(() => {

  // }, [currentUser]);

  const handleSelectUser = async (userSelect: user) => {
    if (currentUser?.role === "ADMIN") {
      let allUserNew = allUser?.map((user: user) => {
        if (user.id === userSelect.id) {
          return { ...user, active: true };
        } else {
          return { ...user, active: false };
        }
      });
      if (allUserNew) {
        setAllUser(allUserNew);
      }
      setCurrentChat(userSelect);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        let currentUser = getStoreJSON(CURRENT_USER);
        if (currentUser.role === "USER") {
          let admin = await axios.get(getUserAdmin);
          setCurrentChat(admin.data.content);
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
              <SilderAdminUser
                currentChat={currentChat}
                arrUser={allUser}
                handleSelectUser={handleSelectUser}
              />
            ) : (
              ""
            )}
            <Layout className="bg-White">
              {isLoadInterface ? (
                currentChat !== null ? (
                  <>
                    <ChatContainer
                      currentChat={currentChat}
                      socket={socket}
                      arrUser={allUser}
                    />
                  </>
                ) : (
                  " "
                )
              ) : (
                <>
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
                    <button
                      className="text-3xl text-slate-100  "
                      onClick={() => setIsOpen(false)}
                    >
                      <AiOutlineCloseCircle />
                    </button>
                  </Header>
                  <ChatContainer
                    currentChat={currentChat}
                    socket={socket}
                    arrUser={allUser}
                  />
                </>
              )}
            </Layout>
          </Layout>
        ) : (
          <button
            className="text-4xl fixed z-50 right-1 bottom-4"
            onClick={() => {
              if (getStoreJSON(CURRENT_USER)) {
                setIsOpen(true);
              } else {
                navigate("/login");
              }
            }}
          >
            <AiFillMessage />
          </button>
        )}
      </div>
    </>
  );
}
