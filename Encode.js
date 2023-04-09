class Encode {
    static toBase(num, base) {
        let nums = [];
        while (num > 0) {
            nums.unshift(num % base);
            num = Math.floor(num / base);
        }
        return nums;
    }
    static mapChars(nums, chars) {
        string = ""
        for (var i = 0; i < nums.length; i++) {
            string += chars.charAt(nums[i]);
        }
        return string;
    }
    // static base64encode()
}