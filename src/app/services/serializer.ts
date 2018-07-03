/**
 * Created by Kelvin on 03/07/2018.
 */
export interface Serializer {
  fromJson(json: any): Resource;
  toJson(resource: Resource): any;
}
