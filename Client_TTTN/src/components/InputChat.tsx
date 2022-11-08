import { Input } from "antd";
import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
const { Search } = Input;

type Props = {
  handleSendMsg: (msg: string) => Promise<void>;
};

const InputChat = ({ handleSendMsg }: Props) => {
  const [mes, setMes] = useState<string>();
  return (
    <>
      <Search
        allowClear
        enterButton={<IoMdSend />}
        size="large"
        onChange={(e:any)=>{setMes(e.target.value)}}
        onSearch={(value: string) =>{handleSendMsg(value); setMes(" ");}}
        value={mes}
        onPressEnter={(e: any) => {
          if (e.key === "Enter") {
            handleSendMsg(e.target.value);
            setMes(" ");
          }
        }}
      />
    </>
  );
};

export default InputChat;
