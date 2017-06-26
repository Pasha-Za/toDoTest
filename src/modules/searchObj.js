export default function searchObjInArray (nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].ref === nameKey) {
            return myArray[i];
        }
    }
}
