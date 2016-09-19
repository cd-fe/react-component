module.exports = function(arr) {
    for(var i=0;i<arr.length;i++) {
        var it = arr[i];
        for(var j=arr.length - 1;j>i;j--) {
            if(arr[j] == it) {
                arr.splice(j, 1);
            }
        }
    }
    return arr;
}