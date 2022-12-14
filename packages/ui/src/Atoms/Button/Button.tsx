import { PropsWithChildren } from "react";
import Styles from "./Button.module.scss";

type Props = {
  className: "string";
};

export function Button({ children }: PropsWithChildren) {
  return <button className={Styles.Button}>{children}</button>;
}
