/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');


class Auction extends Contract {

    async instantiate(ctx) {
        console.info('Contract is instantiating');
    }

    async CreateAssetsandMembers(ctx) {

        console.info('Create 1. Commodities 2. Traders');
        let commKey = 'GOLD';
        let commodity = {
            docType: 'commodity',
            description: 'Yellow Bars',
            mainExchange: 'London',
            quantity: 100,
            owner: 'SI1'
        };

        await ctx.stub.putState(commKey, JSON.stringify(commodity));

        commKey = 'WONDERDRUG';
        commodity = {
            docType: 'commodity',
            description: 'Wonder Drug',
            mainExchange: 'Geneva',
            quantity: 300,
            owner: 'RT2'
        };

        await ctx.stub.putState(commKey, JSON.stringify(commodity));

        let traderKey = 'SI1';
        let trader = {
            docType: 'trader',
            firstName: 'Solid',
            lastName: 'Investor'
        };

        await ctx.stub.putState(traderKey, JSON.stringify(trader));


        traderKey = 'RT2';
        trader = {
            docType: 'trader',
            firstName: 'Risky',
            lastName: 'Trader'
        };

        await ctx.stub.putState(traderKey, JSON.stringify(trader));

        return;

    }


    // read function to query the quantity of a commodity
    async checkQuantity(ctx, commKey) {
        console.info('Check quantity', commKey);

        let commodityBytes = await ctx.stub.getState(commKey);

        let commodity = JSON.parse(commodityBytes);
        console.info('Commodity Checked Quantity: ', commodity.quantity);

        return 'Checked Quantity:' + commodity.quantity;
    }

    // trade function to trade commodities to new owner
    async trade(ctx, commKey, newOwner) {
        console.info('Trade to new owner', commKey, ' ', newOwner);

        let commodityBytes = await ctx.stub.getState(commKey);
        if (commodityBytes.length > 0) {
            let commodity = JSON.parse(commodityBytes);
            console.info('Commodity Existing Owner: ', commodity.owner);
            commodity.owner = newOwner;
            console.info('Commodity New Owner: ', commodity.owner);
            await ctx.stub.putState(commKey, JSON.stringify(commodity));

            return 'New Owner: ' + commodity.owner;
        }
        else {
            console.info('No Commodity with that key: ', commKey);
            return 'No Commodity with that key:' + commKey;
        }
    }

}

module.exports = Auction;
