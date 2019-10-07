export default class CastingUtils {
    public static checkStringNumber(input: string) {
        for (var i = 0; i < input.length; i++) 
        {
            const ret = input.charCodeAt(i);
            if (!((ret > 47) && (ret < 58)))  
            {
                return false;
            }
        }
        return true;
    }
}