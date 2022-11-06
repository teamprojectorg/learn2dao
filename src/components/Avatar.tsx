import { Avatar as BaseAvatar } from "@web3uikit/core";

type AvatarProps = {
  size?: number;
  text: string;
};
const Avatar = ({ size, text }: AvatarProps) => (
  <BaseAvatar
    theme="letters"
    avatarBackground="#000"
    borderRadius={4}
    // isRounded
    textColor="#FFF"
    text={text}
    size={size}
  />
);

export default Avatar;
