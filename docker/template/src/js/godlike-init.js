import { options } from './parts/_options';

if (typeof Godlike !== 'undefined') {
    Godlike.setOptions(options);
    Godlike.init();
}
