// 组件库按需引入
import {
    Loading,
    Pagination,
    Dialog,
    Autocomplete,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Tag,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    TimePicker,
    MessageBox,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Tree,
    Alert,
    Slider,
    Icon,
    Upload,
    Progress,
    Message,
    Carousel,
    Scrollbar,
    CarouselItem,
    Cascader,
    Link,
    Image,
    InfiniteScroll,
    CascaderPanel,
    Drawer,
} from 'element-ui';

const components = [
    Pagination,
    Dialog,
    Autocomplete,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Tag,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    TimePicker,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Tree,
    Alert,
    Slider,
    Icon,
    Upload,
    Progress,
    Carousel,
    Scrollbar,
    CarouselItem,
    Cascader,
    Link,
    Image,
    CascaderPanel,
    Drawer,
]

import 'element-ui/lib/theme-chalk/index.css';

// 加载全局样式
import '@/core/assets/global.css';

// 预安装插件
export default {
    install: function (Vue, opts = {}) {
        // 安装ElementUI
        components.forEach(component => {
            Vue.use(component);
        });

        Vue.use(InfiniteScroll);
        Vue.use(Loading.directive);

        Vue.prototype.$ELEMENT = {
            size: opts.size || '',
            zIndex: opts.zIndex || 2000
        };

        Vue.prototype.$loading = Loading.service;
        Vue.prototype.$msgbox = MessageBox;
        Vue.prototype.$alert = MessageBox.alert;
        Vue.prototype.$confirm = MessageBox.confirm;
        Vue.prototype.$prompt = MessageBox.prompt;
        Vue.prototype.$message = Message;
    }
}