/**
 * Array protypes
 */
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

Array.prototype.isArrayEqual = function(SecondaryArray){
    if(this.sort().join(',')=== SecondaryArray.sort().join(',')){
        return true;
    }
    else {
        return false;
    }
}
/**
 * String prototypes
 */
