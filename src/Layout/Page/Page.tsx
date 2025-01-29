import React, { PropsWithChildren } from 'react';
import layoutStyles from '../LayoutStyles.module.css';

const Page = ({ children }: PropsWithChildren) => {
  return <div className={layoutStyles.Page}>{children}</div>;
};

export default Page;
