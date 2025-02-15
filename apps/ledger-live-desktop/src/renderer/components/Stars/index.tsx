import React from "react";
import { useSelector } from "react-redux";
import { Trans } from "react-i18next";
import styled from "styled-components";
import { getAccountCurrency } from "@ledgerhq/live-common/account/index";
import Hide from "~/renderer/components/MainSideBar/Hide";
import Text from "~/renderer/components/Text";
import Tooltip from "~/renderer/components/Tooltip";
import Image from "~/renderer/components/Image";
import emptyBookmarksDark from "~/renderer/images/dark-empty-bookmarks.png";
import emptyBookmarksLight from "~/renderer/images/light-empty-bookmarks.png";
import Item from "./Item";
import { starredAccountsSelector } from "~/renderer/reducers/accounts";
import { walletSelector } from "~/renderer/reducers/wallet";
import { accountNameSelector } from "@ledgerhq/live-wallet/store";
import { getDefaultAccountName } from "@ledgerhq/live-wallet/accountName";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Placeholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  text-align: center;
  padding: 0px 8px;
  & > :first-child {
    margin-bottom: 14px;
  }
`;

type Props = {
  pathname: string;
  collapsed: boolean;
};
const Stars = ({ pathname, collapsed }: Props) => {
  const walletState = useSelector(walletSelector);
  const starredAccounts = useSelector(starredAccountsSelector);
  return starredAccounts && starredAccounts.length ? (
    <Container key={pathname} data-test-id="drawer-bookmarked-accounts">
      {starredAccounts.map((account, i) => (
        <Tooltip
          content={
            account.type === "Account"
              ? accountNameSelector(walletState, { accountId: account.id }) ||
                getDefaultAccountName(account)
              : getAccountCurrency(account).name
          }
          delay={collapsed ? 0 : 1200}
          key={account.id}
          placement={collapsed ? "right" : "top"}
        >
          <Item
            index={i}
            key={account.id}
            account={account}
            pathname={pathname}
            collapsed={collapsed}
          />
        </Tooltip>
      ))}
    </Container>
  ) : (
    <Hide visible={!collapsed}>
      <Placeholder>
        <Image
          alt="stars placeholder"
          resource={{
            light: emptyBookmarksLight,
            dark: emptyBookmarksDark,
          }}
          width="95"
          height="53"
        />
        <Text
          ff="Inter|SemiBold"
          color="palette.text.shade60"
          fontSize={3}
          style={{
            minWidth: 180,
          }}
        >
          <Trans i18nKey={"stars.placeholder"}>
            {"Accounts that you star on the"}
            <Text ff="Inter|SemiBold" color="palette.text.shade100">
              {"Accounts"}
            </Text>
            {" page will now appear here!."}
          </Trans>
        </Text>
      </Placeholder>
    </Hide>
  );
};
export default Stars;
