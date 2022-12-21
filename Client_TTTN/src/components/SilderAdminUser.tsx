import { Layout } from "antd";
import React from "react";
import { user } from "../pages/Chat";
const { Sider } = Layout;
type Props = {
  arrUser: any;
  handleSelectUser: any;
  currentChat: user | null;
};

export default function SilderAdminUser({
  arrUser,
  handleSelectUser,
  currentChat,
}: Props) {
  return (
    <>
      {currentChat !== null ? (
        <Sider className="">
          <div className="flex flex-col justify-center items-center">
            {arrUser?.map(
              (
                user: { avatar: string; username: string; active: boolean },
                index: number
              ) => {
                return (
                  <div  key={index} className={ user.active ? "text-red-700 bg-slate-300 overflow-hidden rounded-lg flex flex-col items-center w-full" : "flex flex-col items-center"}>
                    <button
                      className="mt-2"
                      onClick={() => {
                        handleSelectUser(user);
                      }}
                    >
                      <img
                        src={
                          user.avatar
                            ? user.avatar
                            : "https://i.pravatar.cc/300"
                        }
                        alt="..."
                        className="w-full h-full rounded-full h-16 w-16"
                      />{" "}
                    </button>
                    <p
                      className={
                        user.active ? "text-red-700 bg-slate-300 " : ""
                      }
                    >
                      {user.username.slice(0, 7) + "..."}
                    </p>
                  </div>
                );
              }
            )}
          </div>
        </Sider>
      ) : (
        <div className="bg-white">
          {arrUser?.map(
            (
              user: { avatar: string; username: string; active: boolean },
              index: number
            ) => {
              return (
                <button
                  className="flex gap-2 mb-2 bg-slate-200 py-2 w-full"
                  key={index}
                  onClick={() => {
                    handleSelectUser(user);
                  }}
                >
                  <div className="pl-2">
                    <img
                      src={
                        user.avatar ? user.avatar : "https://i.pravatar.cc/300"
                      }
                      alt="..."
                      className="w-full h-full rounded-full h-16 w-16  "
                    />
                  </div>
                  <p
                    className={
                      user.active ? "text-red-700 bg-slate-300 pt-2 " : " pt-2"
                    }
                  >
                    {user.username}
                  </p>
                </button>
              );
            }
          )}
        </div>
      )}
    </>
  );
}
