/**
 *
 * @author 
 *
 */
class TsMap {
	public constructor() {
    }
    // Map大小/  
    private _size = 0;
    //对象/  
    public entry = new Object();
    
    //Map的存put方法/  
    public put(key,value): void {
        if(!this.containsKey(key)) {
            this._size++;
            this.entry[key] = value;
        }
    }
    //Map的修改方法/
    public set(key, value): void{
        if(this.containsKey(key)) {
            this.entry[key] = value;
        }
    }
    //Map取get方法/  
    public get(key): Object {
        return this.containsKey(key) ? this.entry[key] : null;
    }
    //Map删除remove方法/  
    public remove(key): Object {
        let val = this.entry[key];
        if(this.containsKey(key) && (delete this.entry[key])) {
            this._size--;
        }
        return val;
    }
    //是否包含Key/  
    public containsKey(key) {
        return (key in this.entry);
    }
    //是否包含Value/  
    public containsValue(value) {
        for(var prop in this.entry) {
            if(this.entry[prop] == value) {
                return true;
            }
        }
        return false;
    }
    //所有的Value/  
    public get values():Array<any> {
        var values = new Array<any>();
        for(var prop in this.entry) {
            values.push(this.entry[prop]);
        }
        return values;
    }
    //所有的 Key/  
    public get keys(): Array<any> {
        var keys = new Array<any>();
        for(var prop in this.entry) {
            keys.push(prop);
        }
        return keys;
    }
    //Map size/  
    public get size(): number {
        return this._size;
    }
    //清空Map/  
    public clear() {
        this._size = 0;
        this.entry = new Object();
    }
}