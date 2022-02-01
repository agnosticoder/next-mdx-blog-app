/* eslint-disable */
// const phil = {
//     name: {
//         honorific: 'Dr',
//         first: 'Philip',
//         last: 'Rediquez',
//         username: 'drphilip'
//     }
// }

// function getDisplayName(user, {includeHonorific = false, includeUsername = false} = {}){
//     let displayName = `${user.name.first} ${user.name.last}`;
//     if(includeHonorific){
//         displayName =  `${user.name.honorific} ${displayName}`;
//     }

//     if(includeUsername){
//         displayName = `${displayName} (${user.name.username})`;
//     }
//     return displayName;
// }

// const navDisplayName = getDisplayName(phil);
// console.log(navDisplayName);

// const profileDisplayName = getDisplayName(phil, {includeHonorific: true});
// console.log(profileDisplayName);

// const userCardName = getDisplayName(phil, {includeUsername: true});
// console.log(userCardName);





const Test = () => {
    console.log('Test Component');
    return (
        <div>
            <h5>Test Something Great!</h5>
        </div>
    )
}

export default Test;
