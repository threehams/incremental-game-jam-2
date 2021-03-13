import { BuyUpgrade, PurchasedUpgrade, useStoreValue } from "@botnet/store";
import { css } from "@emotion/react";
import React from "react";
import { Button } from "../Button";

export const UpgradePanel = () => {
  const {
    purchasedUpgrades,
    buyUpgrade,
    highestMoneys,
    moneys,
  } = useStoreValue();
  if (!purchasedUpgrades) {
    return <div>Nothing here</div>;
  }
  const automationUpgrades = [
    purchasedUpgrades.autoKill,
    purchasedUpgrades.autoPack,
    purchasedUpgrades.autoSell,
    purchasedUpgrades.autoSort,
    purchasedUpgrades.autoTravel,
  ].filter((upgrade) => {
    return (
      upgrade.level > 0 ||
      (upgrade.cost > 0 && upgrade.cost <= highestMoneys * 2)
    );
  });

  const standardUpgrades = [
    purchasedUpgrades.kill,
    purchasedUpgrades.pack,
    purchasedUpgrades.sell,
    purchasedUpgrades.sort,
    purchasedUpgrades.travel,
  ].filter((upgrade) => {
    return (
      upgrade.level > 0 ||
      (upgrade.cost > 0 && upgrade.cost <= highestMoneys * 2)
    );
  });

  return (
    <div>
      {!!standardUpgrades.length && (
        <>
          <h1
            css={css`
              margin-bottom: 20px;
            `}
          >
            Upgrades
          </h1>
          <ul
            css={css`
              & > * {
                margin-bottom: 10px;
              }
            `}
          >
            {standardUpgrades.map((upgrade) => {
              return (
                <UpgradeButton
                  key={upgrade.name}
                  buyUpgrade={buyUpgrade}
                  moneys={moneys}
                  upgrade={upgrade}
                />
              );
            })}
          </ul>
        </>
      )}
      {!!automationUpgrades.length && (
        <>
          <h1
            css={css`
              margin-bottom: 20px;
            `}
          >
            Automation
          </h1>
          <ul
            css={css`
              & > * {
                margin-bottom: 10px;
              }
            `}
          >
            {automationUpgrades.map((upgrade) => {
              return (
                <UpgradeButton
                  key={upgrade.name}
                  buyUpgrade={buyUpgrade}
                  moneys={moneys}
                  upgrade={upgrade}
                />
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

type UpgradeButtonProps = {
  buyUpgrade: BuyUpgrade;
  upgrade: PurchasedUpgrade;
  moneys: number;
};
const UpgradeButton = ({ upgrade, buyUpgrade, moneys }: UpgradeButtonProps) => {
  return (
    <Button
      css={css`
        display: flex;
        justify-content: space-between;
        width: 100%;
      `}
      disabled={!upgrade.cost || upgrade.cost > moneys}
      onClick={() => {
        buyUpgrade({ id: upgrade.id });
      }}
    >
      <span>
        {upgrade.level ? upgrade.upgradeName : upgrade.name}{" "}
        {upgrade.level > 0 && `(${upgrade.level})`}
      </span>{" "}
      <span>${upgrade.cost}</span>
    </Button>
  );
};
