export default { // https://ant-design.antgroup.com/docs/react/customize-theme-cn#seedtoken
    token: {
        fontSize: 16, // (fontSize / rootValue) 16/16 rem
        colorPrimary: '#fa3899',
        colorBgLayout: '#f7f8fa'
    },
    components: {
        Layout: {},
        Menu: {
            itemBg: 'transparent',
            itemHoverColor: '#fa3899',
            itemSelectedColor: '#fa3899',
            activeBarHeight: 0,
            itemPaddingInline: 12,
            iconMarginInlineEnd: 8,
            activeBarBorderWidth: 0,
        },
        FloatButton: {
            colorBgElevated: '#fa3899',
            colorText: '#fff'
        }
    }
}
