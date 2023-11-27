/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const vehicle = [
            {
                vehicleType: 'car',
                color: 'blue',
                make: 'Toyota',
                model: 'Prius',
                owner: 'Tomoko',
                dateOfManufacture: new Date().toString(),
                status: 'Manufactured',
            },
            {
                vehicleType: 'bike',
                color: 'black',
                make: 'Yamaha',
                model: 'FZ',
                owner: 'Brad',
                dateOfManufacture: new Date().toString(),
                status: 'Manufactured',
            },
            {
                vehicleType: 'car',
                color: 'green',
                make: 'Hyundai',
                model: 'Tucson',
                owner: 'Jin Soo',
                dateOfManufacture: new Date().toString(),
            },
            {
                vehicleType: 'car',
                color: 'yellow',
                make: 'Volkswagen',
                model: 'Passat',
                owner: 'Max',
                dateOfManufacture: new Date().toString(),
                status: 'Manufactured',
            },
        ];

        for (let i = 0; i < vehicle.length; i++) {
            await ctx.stub.putState('car'+i, Buffer.from(JSON.stringify(vehicle[i])));
            console.info('Added <--> ', vehicle[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryVehicle(ctx, vehicleNumber) {
        const vehicleAsBytes = await ctx.stub.getState(vehicleNumber); // get the vehicle from chaincode state
        if (!vehicleAsBytes || vehicleAsBytes.length === 0) {
            throw new Error(`${vehicleNumber} does not exist`);
        }
        console.log(vehicleNumber.toString());
        return vehicleNumber.toString();
    }

    async createVehicle(ctx, vehicleType = 'car', vehicleNumber, make, model, color, owner)  {
        console.info('============= START : Create Vehicle ===========');

        const car = {
            color,
            vehicleType,
            make,
            model,
            owner,
            dateOfManufacture : new Date().toString(),
            status: 'Manufactured',
        };

        await ctx.stub.putState(vehicleNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : Create Vehicle ===========');
    }

    async queryAllVehicle(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeVehicleOwner(ctx, vehicleNumber, newOwner) {
        console.info('============= START : changeCarOwner ===========');

        const vehicleAsBytes = await ctx.stub.getState(vehicleNumber); // get the vehicle from chaincode state
        if (!vehicleAsBytes || vehicleAsBytes.length === 0) {
            throw new Error(`${vehicleNumber} does not exist`);
        }
        const vehicle = JSON.parse(vehicleAsBytes.toString());
        vehicle.owner = newOwner;

        await ctx.stub.putState(vehicleNumber, Buffer.from(JSON.stringify(vehicle)));
        console.info('============= END : changeVehicleOwner ===========');
    
    }

    async sellVehicle(ctx, vehicleNumber) {
        console.info('============= START : Selling Vehicle ===========');

        const vehicleAsBytes = await ctx.stub.getState(vehicleNumber); // get the vehicle from chaincode state
        if (!vehicleAsBytes || vehicleAsBytes.length === 0) {
            throw new Error(`${vehicleNumber} does not exist`);
        }
        const vehicle = JSON.parse(vehicleAsBytes.toString());
        vehicle.status = 'Sold';
        
        await ctx.stub.putState(vehicleNumber, Buffer.from(JSON.stringify(vehicle)));
        let vehicleAsBytes1 = await ctx.stub.getState(vehicleNumber);
        console.log(vehicleAsBytes1.toString());
        console.info('============= END : Vehicle Sold ===========');
    }

    async registerVehicle(ctx, vehicleNumber, newOwner) {
        console.info('============= START : Register Vehicle ===========');

        const vehicleAsBytes = await ctx.stub.getState(vehicleNumber); // get the vehicle from chaincode state
        if (!vehicleAsBytes || vehicleAsBytes.length === 0) {
            throw new Error(`${vehicleNumber} does not exist`);
        }
        const vehicle = JSON.parse(vehicleAsBytes.toString());
        vehicle.owner = newOwner;
        vehicle.status = 'Registered';
        
        await ctx.stub.putState(vehicleNumber, Buffer.from(JSON.stringify(vehicle)));
        let vehicleAsBytes1 = await ctx.stub.getState(vehicleNumber);
        console.log(vehicleAsBytes1.toString());
        console.info('============= END : Vehicle Successfully Registered ===========');
    }

    async insureVehicle(ctx, vehicleNumber) {
        console.info('============= START : insure Vehicle ===========');

        const vehicleAsBytes = await ctx.stub.getState(vehicleNumber); // get the vehicle from chaincode state
        if (!vehicleAsBytes || vehicleAsBytes.length === 0) {
            throw new Error(`${vehicleNumber} does not exist`);
        }
        const vehicle = JSON.parse(vehicleAsBytes.toString());
        vehicle.status = 'Insured';
        
        await ctx.stub.putState(vehicleNumber, Buffer.from(JSON.stringify(vehicle)));
        let vehicleAsBytes1 = await ctx.stub.getState(vehicleNumber);
        console.log(vehicleAsBytes1.toString());
        console.info('============= END : Vehicle Successfully Insured ===========');
    }

    async scrapVehicle(ctx, vehicleNumber, newOwner) {
        console.info('============= START : Scrap Vehicle ===========');

        let vehicleAsBytes = await ctx.stub.getState(vehicleNumber); // get the vehicle from chaincode state
        if (!vehicleAsBytes || vehicleAsBytes.length === 0) {
            throw new Error(`${vehicleNumber} does not exist`);
        }
        const vehicle = JSON.parse(vehicleAsBytes.toString());
        vehicle.owner = newOwner;
        vehicle.status = 'Scrapped';
        
        await ctx.stub.putState(vehicleNumber, Buffer.from(JSON.stringify(vehicle)));
        let vehicleAsBytes1 = await ctx.stub.getState(vehicleNumber);
        console.log(vehicleAsBytes1.toString());
        console.info('============= END : Vehicle Successfully Scrapped ===========');
    }
}

module.exports = FabCar;