// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";


function combineUserData(id, userData, vaultData) {
    return {
        id: id,
        name: vaultData.name,
        username: userData.username,
        email: vaultData.email,
        address: {
            street: vaultData.address.street,
            suite: vaultData.address.suite,
            city: vaultData.address.city,
            zipcode: vaultData.address.zipcode,
            geo: {
                lat: vaultData.address.geo.lat,
                lng: vaultData.address.geo.lng
            }
        },
        phone: vaultData.phone,
        website: userData.website,
        company: {
            name: userData.company.name,
            catchPhrase: userData.company.catchPhrase,
            bs: userData.company.bs
        }
    }
}

//this is async await realisation
async function getUserDataAsunc(id) {
    const dbs = {
        db1: db1,
        db2: db2,
        db3: db3
    };

    try {
        let dbWithData = await central(id); // 100ms to get the needed db
        let userDataPr = dbs[dbWithData](id); //this is a promise
        let vaultDataPr = vault(id); //this is another promise
        let [userData, vaultData] = await Promise.all([userDataPr, vaultDataPr]); // running both priomisses in parralel
        //console.log(userData, vaultData);
        return combineUserData(id, userData, vaultData);
    } catch (error) {
        throw error; // propagating the error        
    }

}


// first async approach
const startTime = performance.now(); // stating timer
try {
    const userDataAsync1 = getUserDataAsunc(1); // this is a promise we should await
    const userDataAsync2 = getUserDataAsunc(2); // this is a promise we should await
    const userDataAsync3 = getUserDataAsunc(3); // this is a promise we should await
    console.log(await Promise.all([userDataAsync1,userDataAsync2,userDataAsync3])); // awaiting 3 promisses in parralel
} catch (error) {
    console.error(error.message);
}
const endTime = performance.now(); //ending timer
console.log(`Async/await time: ${endTime - startTime} ms`); 


// // second promise approach
// const startTime2 = performance.now(); // stating timer
// try {
//     const userDataAsync1 = getUserDataAsunc(1); // this is a promise we should await
//     const userDataAsync2 = getUserDataAsunc(2); // this is a promise we should await
//     const userDataAsync3 = getUserDataAsunc(3); // this is a promise we should await
//     console.log(await Promise.all([userDataAsync1,userDataAsync2,userDataAsync3])); // awaiting 3 promisses in parralel
// } catch (error) {
//     console.error(error.message);
// }
// const endTime2 = performance.now(); //ending timer
// console.log(`Promise time: ${endTime2 - startTime2} ms`); 

