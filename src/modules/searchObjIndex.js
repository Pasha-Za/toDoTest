export default function searchObjIndexInArray (nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].ref === nameKey) {
            return i;
        }
    }
}
