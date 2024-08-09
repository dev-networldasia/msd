// Example about using environment variables: https://create-react-app.dev/docs/adding-custom-environment-variables/
export const API_URL = process.env.REACT_APP_API_URL;
export const META_URL = process.env.REACT_APP_META_URL;
export const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
// https://msd.bdata.link/api/WEB

export const KEY_MAP = `${process.env.REACT_APP_KEY_MAP}`;
export const META_LOGO = process.env.REACT_APP_IMAGE_URL_CATEGORY;
export const IMAGE_URL_CATEGORY = process.env.REACT_APP_IMAGE_URL_CATEGORY;
// export const API_URL = "http://10.161.28.173:8006/api/WEB";
// export const IMAGE_URL = 'http://10.161.28.173:8006/api/CMS/image/folder/'

// export const API_URL = "https://hpv.vn/api/WEB";
// export const META_URL = "https://hpv.vn/";
// export const META_LOGO = "https://hpv.vn/static/media/logo.4418c655845db558aebb126b00b09c08.svg";
// export const IMAGE_URL = 'https://hpv.vn/api/CMS/image/folder/'
// export const IMAGE_URL_CATEGORY = "https://hpv.vn/api/CMS/image/";

export const LENGTH_MAX = 225;
export const LENGTH_MAX_NAME = 35;
export const LENGTH_MIN = 4;
export const LIMIT_TIME = 20;
export const LENGTH_PHONE_MAX = 11;
export const LENGTH_PHONE_MIN = 8;
export const DEFAULT_START = 0;

export default {
    process: {
        env: {
            API_URL,
            LENGTH_MAX,
            LENGTH_MAX_NAME,
            LENGTH_MIN,
            LIMIT_TIME,
            LENGTH_PHONE_MAX,
            LENGTH_PHONE_MIN,
            DEFAULT_START
        },
    },
};
