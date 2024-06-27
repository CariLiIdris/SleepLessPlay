import React from 'react';
import { ChatObject } from 'react-chat-engine-advanced';
interface OtherAvatarProps {
    chat: ChatObject;
    username: string;
    style?: React.CSSProperties;
}
declare const OtherAvatars: (props: OtherAvatarProps) => JSX.Element;
export default OtherAvatars;
