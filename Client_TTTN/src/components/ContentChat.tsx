import React from "react";

type Props = {
  message: string;
  css: string;
  textLeftOrRight: string;
  userName: string | undefined;
};

export default function ContentChat({
  message,
  css,
  textLeftOrRight,
  userName,
}: Props) {
  return (
    <div className={textLeftOrRight}>
      <div className={css}>
        {userName && (
          <div className="overflow-hidden  p-0">
            user send:
            <span className="text-red-300">{userName?.slice(0, 10)}</span>
          </div>
        )}
        <div>{message}</div>
      </div>
    </div>
  );
}
