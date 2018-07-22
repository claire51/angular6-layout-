import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server = 'http://209.97.132.14:8080/';
    public ApiUrl = 'api/';
    public ServerWithApiUrl = this.Server + this.ApiUrl;
}
