import {alpha} from "@mui/material";

export const mainTheme = {
    breakpoints: {
        values: {
            xs: 0,
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200,
        }
    },

    palette: {
        primary: {
            main: '#007E03',
            light: '#A67FFB',
            dark: '#007E03',
            contrastText: '#FFF'
        },
        secondary: {
            main: '#E44A77',
            light: '#FF7EA6',
            dark: '#DF295E',
            contrastText: '#FFF'
        },
        error: {
            main: '#E73145',
            light: '#FF6A70',
            dark: '#AD001E',
            contrastText: '#FFF'
        },
        warning: {
            main: '#F39711',
            light: '#FFC84C',
            dark: '#BB6900',
            contrastText: '#FFF'
        },
        info: {
            main: '#2EB5C9',
            light: '#6FE7FC',
            dark: '#008598',
            contrastText: '#FFF'
        },
        success: {
            main: '#007E03',
            light: '#78FFD3',
            dark: '#00A073',
            contrastText: '#FFF'
        },
        text: {
            primary: '#263238',
            secondary: '#8595A6',
            disabled: '#A2B2C3',
        },
        divider : '#DEE2E6',
        background: {
            paper: '#FFFFFF',
            default: '#FFFFFF',
        },
        action: {
            active: '#263238',
            hover: '#F5F7FA',
        },
    },
    shadows: [
        "none",
        "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
        "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
        "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
        "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
        "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
        "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
        "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
        "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
        "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
        "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
        "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
        "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
        "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
        "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
        "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
        "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
        "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
        "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
        "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
        "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
        "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
        "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
        "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
        "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
        "0 5px 10px rgba(0, 0, 0, 0.085)",
        "0 5px 10px rgba(0, 0, 0, 0.175)",
    ],
    typography: {
        fontFamily: 'NoirPro, Arial',
        fontSize: 14,
        h1: {
            fontSize: '1.5rem',
            lineHeight: 1.2,
            fontWeight: 400,
            color: '#37373C',
            margin: '0 0 .5rem'
        },
        h2: {
            fontSize: '1.4rem',
            lineHeight: 1.2,
            fontWeight: 400,
            color: '#37373C',
            margin: '0 0 .5rem'
        },
        h3: {
            fontSize: '1.25rem',
            lineHeight: 1.2,
            fontWeight: 400,
            color: '#37373C',
            margin: '0 0 .5rem'
        },
        h4: {
            fontSize: '1.1rem',
            lineHeight: 1.2,
            fontWeight: 400,
            color: '#37373C',
            margin: '0 0 .5rem'
        },
        h5: {
            fontSize: '1rem',
            lineHeight: 1.2,
            fontWeight: 400,
            color: '#37373C',
            margin: '0 0 .5rem'
        },
        h6: {
            fontSize: '.875rem',
            lineHeight: 1.2,
            fontWeight: 400,
            color: '#37373C',
            margin: '0 0 .5rem'
        },
        body1: {
            fontSize: '.875rem',
        }
    },
    components: {
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderColor: alpha('#000', 0.1),
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    minHeight: 'auto',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: `0 0.5rem 1.25rem ${alpha('#007E03', .175)}`
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: 24
                },
            },
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    padding: '18px 24px'
                },
                title: {
                    fontSize: '1.1rem',
                    marginBottom: 0
                },
                subheader: {
                    margin: '4px 0 0'
                },
                action: {
                    margin: 0
                }
            }
        },
        MuiCardActions: {
            styleOverrides: {
                root: {
                    padding: '8px 24px'
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                sizeSmall: {
                    height: 22,
                    fontSize: 12,
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 400,
                    letterSpacing: 1,
                    '&:hover': {
                        backgroundColor: '#007E03'
                    },
                    disabled: {
                        backgroundColor: alpha('#007E03', .5)
                    },
                    '&:disabled': {
                        backgroundColor: alpha('#007E03', .5)
                    },
                    textTransform: 'none'
                },
                sizeSmall: {
                    fontSize: '12px'
                }
            }
        },
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    '&.MuiToggleButton-root': {
                        padding: '5px 8px',
                    },
                    '&.MuiToggleButtonGroup-root.MuiToggleButtonGroup-grouped': {
                        margin: '8px',
                        color: '#C7C7C7',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #C4C4C4',
                        borderRadius: '4px',
                        '&:hover': {
                            color: '#C7C7C7',
                            backgroundColor: '#FFFFFF',
                        }
                    },
                    '&.MuiToggleButton-root.Mui-selected': {
                        color: '#fff',
                        borderRadius: '4px',
                        border: '1px solid #007E03',
                        backgroundColor: '#007E03',
                        '&:hover': {
                            color: '#fff',
                            backgroundColor: '#007E03'
                        }
                    }
                }
            }
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                grouped: {
                    margin: '8px',
                    color: '#C7C7C7',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #C4C4C4',
                    borderRadius: '4px',
                    textTransform: 'none',
                    '&:hover': {
                        color: '#C7C7C7',
                        backgroundColor: '#FFFFFF',
                    },
                    '&:not(:last-of-type)': {
                        borderTopRightRadius: '4px',
                        borderBottomRightRadius: '4px'
                    },
                    '&:not(:first-of-type)': {
                        borderTopLeftRadius: '4px',
                        borderBottomLeftRadius: '4px',
                        borderLeft: '1px solid #C4C4C4',
                    },
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInput-underline': {
                        '&:before': {
                            borderBottom: '1px solid #E0E0E0'
                        },
                    },
                }
            }
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    alignItems: 'center'
                }
            }
        },
        MuiLoadingButton: {
            styleOverrides: {
                loadingIndicator: {
                    color: '#ffffff',
                    textTransform: 'none'
                }
            }
        },
        MuiDataGrid: {
            styleOverrides: {
                cellContent: {
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'normal',
                },
            },
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    marginRight: 0,
                    marginLeft: 0
                }
            }
        },
        MuiPopover: {
            styleOverrides: {
                paper: {
                    borderRadius: 8
                }
            }
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    fontSize: 18
                }
            }
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    padding: '16px 24px'
                }
            }
        },
        MuiAvatarGroup: {
            styleOverrides: {
                avatar: {
                    backgroundColor: '#757575',
                    fontSize: 16
                }
            }
        }
    },
    jumboComponents: {
        JumboSearch: {
            background: '#F5F5F5'
        }
    }
};
