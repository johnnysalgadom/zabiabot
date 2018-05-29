'use strict';

// Imports
const express = require('express');
const bodyParser = require('body-parser');
const Smooch = require('smooch-core');

// Config
const PORT = 8000;
const KEY_ID = 'app_5b03768551a83900227a8ae6';
const SECRET = 'YyjH7Dw4-yU5d0zLtIGsOonc';

const smooch = new Smooch({
    keyId: KEY_ID,
    secret: SECRET,
    scope: 'app'
})

// Server https://expressjs.com/en/guide/routing.html
const app = express();

app.use(bodyParser.json());

//recibir mensajes desde Smooch a través de webhook
app.post('/message', function(req, res) {
    console.log('webhook PAYLOAD\n', JSON.stringify(req.body, null, 4));

    const appUserId = req.body.appUser._id;
    const nombreUsuario = (req.body.appUser.givenName != 'undefined' && req.body.appUser.givenName != '') ? req.body.appUser.givenName : req.body.appUser.userId;
    const saludo = 'Hola ' + nombreUsuario;
    var imagenSiente = '';

    if (req.body.trigger == 'message:appUser') {

        var smoochPayload = (req.body.messages[0].payload != '' && req.body.messages[0].payload != undefined) ? req.body.messages[0].payload : '';

        if (smoochPayload == '' || smoochPayload == undefined) {

            smooch.appUsers.sendMessage(appUserId, {
                text: saludo + ', ¿en que te gustaria enfocarte hoy?',
                role: 'appMaker',
                type: 'text'
            }).then(() => {
                smooch.appUsers.sendMessage(appUserId, {
                    role: 'appMaker',
                    type: 'carousel',
                    items: [{
                        title: 'Sentirse bien',
                        mediaUrl: 'https://www.southtech.pe/zabiatest/imagen/icono/sentirsebien.png',
                        mediaType: 'image/png',
                        actions: [{
                            text: 'Seleccionar',
                            type: 'postback',
                            payload: 'SENTIRSE_BIEN'
                        }]
                    }, {
                        title: 'Mantenerse activo',
                        mediaUrl: 'https://www.southtech.pe/zabiatest/imagen/icono/mantenerseactivo.png',
                        mediaType: 'image/png',
                        actions: [{
                            text: 'Seleccionar',
                            type: 'postback',
                            payload: 'MANTENERSE_ACTIVO'
                        }]
                    }, {
                        title: 'Comer sano',
                        mediaUrl: 'https://www.southtech.pe/zabiatest/imagen/icono/mandarinas.png',
                        mediaType: 'image/png',
                        actions: [{
                            text: 'Seleccionar',
                            type: 'postback',
                            payload: 'COMER_SANO'
                        }]
                    }]
                }).then(() => {});
            }).catch((err) => {});

        } else {

            if (smoochPayload == 'SI') {
                smooch.appUsers.sendMessage(appUserId, {
                    role: 'appMaker',
                    type: 'carousel',
                    items: [{
                        title: 'Sentirse bien',
                        mediaUrl: 'https://www.southtech.pe/zabiatest/imagen/icono/sentirsebien.png',
                        mediaType: 'image/png',
                        actions: [{
                            text: 'Seleccionar',
                            type: 'postback',
                            payload: 'SENTIRSE_BIEN'
                        }]
                    }, {
                        title: 'Mantenerse activo',
                        mediaUrl: 'https://www.southtech.pe/zabiatest/imagen/icono/mantenerseactivo.png',
                        mediaType: 'image/png',
                        actions: [{
                            text: 'Seleccionar',
                            type: 'postback',
                            payload: 'MANTENERSE_ACTIVO'
                        }]
                    }, {
                        title: 'Comer sano',
                        mediaUrl: 'https://www.southtech.pe/zabiatest/imagen/icono/mandarinas.png',
                        mediaType: 'image/png',
                        actions: [{
                            text: 'Seleccionar',
                            type: 'postback',
                            payload: 'COMER_SANO'
                        }]
                    }]
                }).then(() => {});
            } else if (smoochPayload == 'NO') {
                smooch.appUsers.sendMessage(appUserId, {
                    text: 'Ok, Gracias ' + nombreUsuario + ', aquí estoy siempre! Bye',
                    role: 'appMaker',
                    type: 'text'
                }).then(() => {});
            } else if (smoochPayload == 'TIPO_RECETA') {
                smooch.appUsers.sendMessage(appUserId, {
                    role: "appMaker",
                    type: "list",
                    items: [{
                            title: "Papas asadas al horno",
                            description: "35.22 kcal.",
                            size: "large",
                            mediaUrl: "https://southtech.pe/zabiatest/imagen/receta/a49a0841acee748bc2b18d02ad86cd94.jpg",
                            mediaType: 'image/jpg',
                            actions: [{
                                text: "Ver receta",
                                type: "postback",
                                payload: "RECETA_1"
                            }]
                        },
                        {
                            title: "Salmón a la barbacoa",
                            description: "333.90 kcal.",
                            mediaUrl: "https://southtech.pe/zabiatest/imagen/receta/bbq-salmon-267647.jpg",
                            mediaType: 'image/jpg',
                            actions: [{
                                text: "Ver receta",
                                type: "postback",
                                payload: "RECETA_2"
                            }]
                        },
                        {
                            title: "Filetes de salmón con Soja y miel de Maple",
                            description: "228.40 kcal.",
                            mediaUrl: "http://southtech.pe/zabiatest/imagen/receta/salmon-steaks-with-soy-maple-glaze-4628.jpg",
                            mediaType: 'image/jpg',
                            actions: [{
                                text: "Ver receta",
                                type: "postback",
                                payload: "RECETA_3"
                            }]
                        },
                        {
                            title: "Pasta sin Gluten Con Espárragos",
                            description: "295.43 kcal.",
                            mediaUrl: "https://southtech.pe/zabiatest/imagen/receta/pasta_with_asparagus-38028.jpg",
                            mediaType: 'image/jpg',
                            actions: [{
                                text: "Ver receta",
                                type: "postback",
                                payload: "RECETA_4"
                            }]
                        },
                        {
                            title: "Helado cremoso de Limón",
                            description: "320.86 kcal.",
                            mediaUrl: "https://southtech.pe/zabiatest/imagen/receta/Key-Lime-Ice-Cream-452186.jpg",
                            mediaType: 'image/jpg',
                            actions: [{
                                text: "Ver receta",
                                type: "postback",
                                payload: "RECETA_5"
                            }]
                        }
                    ]
                }).then(() => {});
            } else if (smoochPayload == 'SI_GUSTA_RECETA') {
                smooch.appUsers.sendMessage(appUserId, {
                    text: 'Muchas Gracias por tu feedback! Lo tendremos en cuenta',
                    role: 'appMaker',
                    type: 'text'
                }).then(() => {});
            } else if (smoochPayload == 'RETORNO_PRINCIPAL') {
                smooch.appUsers.sendMessage(appUserId, {
                    role: 'appMaker',
                    type: 'carousel',
                    items: [{
                        title: 'Sentirse bien',
                        mediaUrl: 'https://www.southtech.pe/zabiatest/imagen/icono/sentirsebien.png',
                        mediaType: 'image/png',
                        actions: [{
                            text: 'Seleccionar',
                            type: 'postback',
                            payload: 'SENTIRSE_BIEN'
                        }]
                    }, {
                        title: 'Mantenerse activo',
                        mediaUrl: 'https://www.southtech.pe/zabiatest/imagen/icono/mantenerseactivo.png',
                        mediaType: 'image/png',
                        actions: [{
                            text: 'Seleccionar',
                            type: 'postback',
                            payload: 'MANTENERSE_ACTIVO'
                        }]
                    }, {
                        title: 'Comer sano',
                        mediaUrl: 'https://www.southtech.pe/zabiatest/imagen/icono/mandarinas.png',
                        mediaType: 'image/png',
                        actions: [{
                            text: 'Seleccionar',
                            type: 'postback',
                            payload: 'COMER_SANO'
                        }]
                    }]
                }).then(() => {});
            } else {
                var mensajeSiente = '';
                imagenSiente = ''

                switch (smoochPayload) {
                    case 'FELIZ':
                        mensajeSiente = 'Que Bien! ' + nombreUsuario + ', Sentirse Feliz es estar bien con uno mismo en cada momento.';
                        imagenSiente = '1.png';
                        break;
                    case 'TRISTE':
                        mensajeSiente = nombreUsuario + ', Hay momentos negativos en nuestras vidas que no vamos a poder controlar pero si podemos elegir como no sentimos al respecto';
                        imagenSiente = '2.png';
                        break;
                    case 'MIEDO':
                        mensajeSiente = 'El Miedo es una sensación desagradable, ' + nombreUsuario + ', provocada por la percepción de un peligro real o imaginario';
                        imagenSiente = '3.png';
                        break;
                    case 'IRA':
                        mensajeSiente = nombreUsuario + ', La Ira es un sentimiento negativo y lo mejor es que la exterioricemos de alguna manera para evitar que devenga una enfermedad';
                        imagenSiente = '4.png';
                        break;
                    case 'NORMAL':
                        imagenSiente = '5.png';
                        break;
                    default:
                        break;
                }

                smooch.appUsers.sendMessage(appUserId, {
                    text: mensajeSiente + '\n\nUna buena alimentación, ejercicios físicos y / o actividades recreacionales, te ayudan a tu estado anímico y a Sentirse Bien ',
                    role: 'appMaker',
                    type: 'text'
                }).then(() => {
                    smooch.appUsers.sendMessage(appUserId, {
                        type: 'image',
                        mediaUrl: 'https://southtech.pe/zabiatest/imagen/icono/recomendacion/' + imagenSiente,
                        role: 'appMaker'
                    }).then(() => {
                        setTimeout(() => {
                            smooch.appUsers.sendMessage(appUserId, {
                                text: '¿Te puedo ayudar en algo más?',
                                role: 'appMaker',
                                type: 'text',
                                actions: [{
                                    type: 'reply',
                                    text: 'Si',
                                    payload: 'SI'
                                }, {
                                    type: 'reply',
                                    text: 'No',
                                    payload: 'NO'
                                }]
                            }).then(() => {});
                        }, 3000);
                    });
                });
            }
        }
        smoochPayload = '';
    }

    if (req.body.trigger == 'postback') {

        var postbackPayload = (req.body.postbacks[0].action.payload != '' && req.body.postbacks[0].action.payload != undefined) ? req.body.postbacks[0].action.payload : '';

        if (postbackPayload == 'SENTIRSE_BIEN') {
            smooch.appUsers.sendMessage(appUserId, {
                text: '¿Cómo te sientes hoy?',
                role: 'appMaker',
                type: 'text',
                actions: [{
                    type: 'reply',
                    text: 'Feliz',
                    iconUrl: 'https://www.southtech.pe/zabiatest/imagen/icono/feliz.png',
                    payload: 'FELIZ'
                }, {
                    type: 'reply',
                    text: 'Triste',
                    iconUrl: 'https://www.southtech.pe/zabiatest/imagen/icono/triste.png',
                    payload: 'TRISTE'
                }, {
                    type: 'reply',
                    text: 'Con miedo',
                    iconUrl: 'https://www.southtech.pe/zabiatest/imagen/icono/miedo.png',
                    payload: 'MIEDO'
                }, {
                    type: 'reply',
                    text: 'Con ira',
                    iconUrl: 'https://www.southtech.pe/zabiatest/imagen/icono/ira.png',
                    payload: 'IRA'
                }, {
                    type: 'reply',
                    text: 'Normal',
                    iconUrl: 'https://www.southtech.pe/zabiatest/imagen/icono/normal.png',
                    payload: 'NORMAL'
                }]
            }).then(() => {});
        } else if (postbackPayload == 'COMER_SANO') {
            smooch.appUsers.sendMessage(appUserId, {
                text: 'Excelente ' + nombreUsuario + ', ¿Déjame ver cómo te puedo apoyar?',
                role: 'appMaker',
                type: 'text'
            }).then(() => {
                smooch.appUsers.sendMessage(appUserId, {
                    role: 'appMaker',
                    type: 'carousel',
                    items: [{
                        title: 'Sitios',
                        mediaUrl: 'https://www.southtech.pe/zabiatest/imagen/icono/sitio.jpg',
                        mediaType: 'image/jpg',
                        actions: [{
                            text: 'Seleccionar',
                            type: 'postback',
                            payload: 'SITIO'
                        }]
                    }, {
                        title: 'Tips',
                        mediaUrl: 'https://www.southtech.pe/zabiatest/imagen/icono/loginzan.png',
                        mediaType: 'image/png',
                        actions: [{
                            text: 'Seleccionar',
                            type: 'postback',
                            payload: 'TIP'
                        }]
                    }, {
                        title: 'Recetas',
                        mediaUrl: 'https://www.southtech.pe/zabiatest/imagen/icono/pitahayasalad.jpg',
                        mediaType: 'image/jpg',
                        actions: [{
                            text: 'Seleccionar',
                            type: 'postback',
                            payload: 'RECETA'
                        }]
                    }, {
                        title: 'Nutrientes',
                        mediaUrl: 'https://www.southtech.pe/zabiatest/imagen/icono/Avocado_facts.jpeg',
                        mediaType: 'image/jpeg',
                        actions: [{
                            text: 'Seleccionar',
                            type: 'postback',
                            payload: 'NUTRIENTE'
                        }]
                    }]
                }).then(() => {});
            });
        } else if (postbackPayload == 'MANTENERSE_ACTIVO') {
            smooch.appUsers.sendMessage(appUserId, {
                text: nombreUsuario + ', La actividad física puede hacer mucho más que ayudarlo a mantenerse en forma, también puede mejorar su salud en general, como por ejemplo:\naliviar el estrés, mejorar el sueño, fortalecer los huesos y músculos, hacerlo sentir lleno de energía, desarrollar fuerza y resistencia, hacerlo sentir bien consigo mismo.',
                role: 'appMaker',
                type: 'text'
            }).then(() => {
                smooch.appUsers.sendMessage(appUserId, {
                    role: 'appMaker',
                    type: 'carousel',
                    items: [{
                        title: 'Formas de activarse',
                        mediaUrl: 'https://www.southtech.pe/zabiatest/imagen/icono/activarse.png',
                        mediaType: 'image/png',
                        actions: [{
                            text: 'Seleccionar',
                            type: 'postback',
                            payload: 'FORMA_ACTIVARSE'
                        }]
                    }, {
                        title: 'Yoga',
                        mediaUrl: 'https://www.southtech.pe/zabiatest/imagen/icono/contigo_mismo.jpeg',
                        mediaType: 'image/jpeg',
                        actions: [{
                            text: 'Seleccionar',
                            type: 'postback',
                            payload: 'YOGA'
                        }]
                    }, {
                        title: 'Meditación',
                        mediaUrl: 'https://www.southtech.pe/zabiatest/imagen/icono/meditacion1.jpeg',
                        mediaType: 'image/jpeg',
                        actions: [{
                            text: 'Seleccionar',
                            type: 'postback',
                            payload: 'MEDITACION'
                        }]
                    }, {
                        title: 'Tips',
                        mediaUrl: 'https://www.southtech.pe/zabiatest/imagen/icono/tip_consejo.jpeg',
                        mediaType: 'image/jpeg',
                        actions: [{
                            text: 'Seleccionar',
                            type: 'postback',
                            payload: 'TIP_ACTIVARSE'
                        }]
                    }]
                }).then(() => {});
            });
        } else if (postbackPayload == 'SITIO') {
            smooch.appUsers.sendMessage(appUserId, {
                role: "appMaker",
                type: "list",
                items: [{
                        title: "Aromas Peruanos",
                        description: "Buffet con más de treinta y cinco platos criollos y marinos.\nAv. Guardia Civil 856, San Isidro",
                        size: "large",
                        mediaUrl: "https://www.southtech.pe/zabiatest/imagen/restaurante/aromas-peruanos-logo_side.jpg",
                        mediaType: 'image/jpg',
                        actions: [{
                            text: "Aromas Peruanos!",
                            type: "postback",
                            payload: "SITIO_FIN"
                        }]
                    },
                    {
                        title: "Astrid y Gastón",
                        description: "El toque de Astrid y Gastón\nAv. Paz Soldán 290, San Isidro",
                        mediaUrl: "https://southtech.pe/zabiatest/imagen/restaurante/astrid-y-gaston-logo_side.jpg",
                        mediaType: 'image/jpg',
                        actions: [{
                            text: "Astrid y Gastón!",
                            type: "postback",
                            payload: "SITIO_FIN"
                        }]
                    },
                    {
                        title: "Mara biomarket",
                        description: "Productos orgánicos y naturales.\nAv. Camino Real 1251, San Isidro ",
                        mediaUrl: "https://southtech.pe/zabiatest/imagen/biotienda/mara.jpg",
                        mediaType: 'image/jpg',
                        actions: [{
                            text: "Mara biomarket!",
                            type: "postback",
                            payload: "SITIO_FIN"
                        }]
                    }
                ]
            }).then(() => {
                smooch.appUsers.sendMessage(appUserId, {
                    text: '¿Te puedo ayudar en algo más?',
                    role: 'appMaker',
                    type: 'text',
                    actions: [{
                        type: 'reply',
                        text: 'Si',
                        payload: 'SI'
                    }, {
                        type: 'reply',
                        text: 'No',
                        payload: 'NO'
                    }]
                }).then(() => {});
            });
        } else if (postbackPayload == 'TIP') {
            smooch.appUsers.sendMessage(appUserId, {
                text: 'Me inspire un poco, te dejo TIPS de Vida saludable!  Buen Dia!',
                role: 'appMaker',
                type: 'text'
            }).then(() => {
                smooch.appUsers.sendMessage(appUserId, {
                    type: 'image',
                    mediaUrl: 'https://southtech.pe/zabiatest/imagen/icono/recomendacion/23.png',
                    role: 'appMaker'
                }).then(() => {});
            }).then(() => {
                setTimeout(() => {
                    smooch.appUsers.sendMessage(appUserId, {
                        text: '¿Te puedo ayudar en algo más?',
                        role: 'appMaker',
                        type: 'text',
                        actions: [{
                            type: 'reply',
                            text: 'Si',
                            payload: 'SI'
                        }, {
                            type: 'reply',
                            text: 'No',
                            payload: 'NO'
                        }]
                    }).then(() => {});
                }, 3000);
            });
        } else if (postbackPayload == 'RECETA') {
            smooch.appUsers.sendMessage(appUserId, {
                text: 'Buenísimo! permíteme saber si tienes alguna preferencia',
                role: 'appMaker',
                type: 'text',
                actions: [{
                    type: 'reply',
                    text: 'Vegana',
                    payload: 'TIPO_RECETA'
                }, {
                    type: 'reply',
                    text: 'Vegetariana',
                    payload: 'TIPO_RECETA'
                }, {
                    type: 'reply',
                    text: 'Pescetariana',
                    payload: 'TIPO_RECETA'
                }, {
                    type: 'reply',
                    text: 'Ninguna',
                    payload: 'TIPO_RECETA'
                }]
            }).then(() => {});
        } else if (postbackPayload == 'RECETA_1') {
            smooch.appUsers.sendMessage(appUserId, {
                text: 'Papas asadas al horno',
                role: 'appMaker',
                type: 'text'
            }).then(() => {
                smooch.appUsers.sendMessage(appUserId, {
                    type: 'image',
                    mediaUrl: 'https://southtech.pe/zabiatest/imagen/receta/a49a0841acee748bc2b18d02ad86cd94.jpg',
                    role: 'appMaker'
                }).then((response) => {});
            }).then(() => {
                setTimeout(() => {
                    smooch.appUsers.sendMessage(appUserId, {
                        text: 'Sancochar las papas con cascara por 10 minutos, hasta que estén ligeramente cocidas.\nTrozarlas en 4 partes, ponerlas sobre una fuente para el horno, rocear con aceite de oliva extra virgen y espolvorear con especias y sal gruesa.\nPoner al horno precalentado por 20 minutos. Servir a gusto.\n\n1 Papa Blanca trozada\n1 cucharadita de romero\n1 cucharadita de sal gruesa\n1 cucharada de aceite de oliva\n\n¿Te gustó?',
                        role: 'appMaker',
                        type: 'text',
                        actions: [{
                            type: 'reply',
                            text: 'Si',
                            payload: 'SI_GUSTA_RECETA'
                        }, {
                            type: 'reply',
                            text: 'No',
                            payload: 'NO'
                        }]
                    });
                }, 3000);
            });
        } else if (postbackPayload == 'RECETA_2') {
            smooch.appUsers.sendMessage(appUserId, {
                text: 'Salmón a la barbacoa',
                role: 'appMaker',
                type: 'text'
            }).then(() => {
                smooch.appUsers.sendMessage(appUserId, {
                    type: 'image',
                    mediaUrl: 'https://southtech.pe/zabiatest/imagen/receta/bbq-salmon-267647.jpg',
                    role: 'appMaker'
                });
            }).then(() => {
                setTimeout(() => {
                    smooch.appUsers.sendMessage(appUserId, {
                        text: 'Una vez precalentada la barbacoa, a fuego medio alto colocar el salmón sobre la parrilla que previamente habremos untado con aceite, sal y pimienta. Si se cocinan lomos, poner el lado sin piel primero, pero si nos gusta la piel crujiente, podremos primero el lado con piel. Una vez en la parrilla, lo dejaremos tocándolo lo menos posible. Un lomo de unos 3 centímetros de grosor se cocina en 6 a 10 minutos. unos 4 o 5 minutos por lado, Cuando está hecho, tenemos que retirarlo del fuego y dejarlo reposar. echarle generosamente salsa Barbecue.\n\nSalmon Fresco  1 kg.\nAceite de Oliva 2 cdta.\npimienta negra 1 cdta.\nsalsa barbecue 1 taza.\n\n¿Te gustó?',
                        role: 'appMaker',
                        type: 'text',
                        actions: [{
                            type: 'reply',
                            text: 'Si',
                            payload: 'SI_GUSTA_RECETA'
                        }, {
                            type: 'reply',
                            text: 'No',
                            payload: 'NO'
                        }]
                    }).then(() => {});
                }, 3000);
            });
        } else if (postbackPayload == 'RECETA_3') {
            smooch.appUsers.sendMessage(appUserId, {
                text: 'Filetes de salmón con Soja y miel de Maple',
                role: 'appMaker',
                type: 'text'
            }).then(() => {
                smooch.appUsers.sendMessage(appUserId, {
                    type: 'image',
                    mediaUrl: 'http://southtech.pe/zabiatest/imagen/receta/salmon-steaks-with-soy-maple-glaze-4628.jpg',
                    role: 'appMaker'
                }).then((response) => {
                    setTimeout(() => {
                        smooch.appUsers.sendMessage(appUserId, {
                            text: 'En un recipiente, ponga una cucharada de salsa de Soja o Sillau, junto con la Miel de Maple, y el aceite de ajonlí.\nAgregue el Salmón y voolteelo para que se marine.Incorpore el jenjibre y ajos rallados en ambos lados del pescado.\nCubra y refrigere por 2 horas, volteando el Salmón varias veces.\nEncienda el carbón en la parrilla, aceite un poco e incorpore el salmón marinado, verifique que el fuego esté moderado, y dorelo a gusto por dos minutos en cada lado.Reserve los jugos de la marinada.\nPonga los jugos de la marinada en un pequeña olla y hiervalo por unos 3 minutos hasta que se espese en una salsa., viertalo en un recipiente.\nSirvalo con unos cebollines a la parrila.\n\nSalmón Rosa 500 gr.\naceite de oliva 2 cucharadas.\ncebolla china 1 taza.\nAjos trozados 1 cucharada.\nJengibre o Kión 1 cucharada.\nMiel de Maple 1 taza.\n\n¿Te gustó?',
                            role: 'appMaker',
                            type: 'text',
                            actions: [{
                                type: 'reply',
                                text: 'Si',
                                payload: 'SI_GUSTA_RECETA'
                            }, {
                                type: 'reply',
                                text: 'No',
                                payload: 'NO'
                            }]
                        });
                    }, 3000);
                });
            });
        } else if (postbackPayload == 'RECETA_4') {
            smooch.appUsers.sendMessage(appUserId, {
                text: 'Pasta sin Gluten Con Espárragos',
                role: 'appMaker',
                type: 'text'
            }).then(() => {
                smooch.appUsers.sendMessage(appUserId, {
                    type: 'image',
                    mediaUrl: 'https://southtech.pe/zabiatest/imagen/receta/pasta_with_asparagus-38028.jpg',
                    role: 'appMaker'
                }).then(() => {
                    setTimeout(() => {
                        smooch.appUsers.sendMessage(appUserId, {
                            text: 'Hierva la pasta por 8 minutos,\nAgregue los esparragos salteados en aceite de olive,\nclara de huevo y ajos,\nmezcle y ralle el queso parmesano.\nSirva y disfrute!.\n\nEspárragos en lata.\n1 yema de huevo.\nAceite de Oliva virgen 1 cda.\nDientes de Ajo 3 unidades.\nQueso Parmesano Reggiano rayado 1/4 taza.\nPasta sin Gluten 1 / 2 kilo.\nSal de mesa  1 cdta.\nPimienta negra 1/2 cdta.\n\n¿Te gustó?',
                            role: 'appMaker',
                            type: 'text',
                            actions: [{
                                type: 'reply',
                                text: 'Si',
                                payload: 'SI_GUSTA_RECETA'
                            }, {
                                type: 'reply',
                                text: 'No',
                                payload: 'NO'
                            }]
                        });
                    }, 3000);
                });
            });
        } else if (postbackPayload == 'RECETA_5') {
            smooch.appUsers.sendMessage(appUserId, {
                text: 'Helado cremoso de Limón',
                role: 'appMaker',
                type: 'text'
            }).then(() => {
                smooch.appUsers.sendMessage(appUserId, {
                    type: 'image',
                    mediaUrl: 'https://southtech.pe/zabiatest/imagen/receta/Key-Lime-Ice-Cream-452186.jpg',
                    role: 'appMaker'
                }).then(() => {
                    setTimeout(() => {
                        smooch.appUsers.sendMessage(appUserId, {
                            text: 'Batir los claras y yemas, azúcar, jugo del limón y la ralladura de limón en un recipiente sobre la hornilla a temperatura media hasta que esté bien batido y uniforme. Mover continuamente la mezcla con una espátula de madera hasta que espese, por aproximadamente 7 a 8 minutos. La mezcla debe estar espesa para que cubra la cuchara.\nRemueva del fuego, siga moviendo y agregue la crema de leche hasta que este suave e uniforme.Cuele la mezcla con un colador fino sobre un recipiente. Cubra y deje enfriar en el refrigerador, moviéndolo ocasionalmente hasta que enfríe por aprox una hora.Vierta la mezcla fría en una cubeta de hacer helados o en una recipiente a prueba de frió y congelen hasta lograr la consistencia deseada.\nTransfiera el helado a contenedor, cubra con film y póngale la tapa.Para mejores resultados, el helado debe mantenerse en la congeladora por mínimo 2 horas o toda la noche antes de consumir.\n\n4Yemas de huevo\n2 claras de huevos\n2 1/4 taza de crema de leche\n1 cucharada de rayadura de limón\n3/4 taza de jugo de limón\n1 1/4 taza de azúcar blanca.\n\n¿Te gustó?',
                            role: 'appMaker',
                            type: 'text',
                            actions: [{
                                type: 'reply',
                                text: 'Si',
                                payload: 'SI_GUSTA_RECETA'
                            }, {
                                type: 'reply',
                                text: 'No',
                                payload: 'RETORNO_PRINCIPAL'
                            }]
                        }).then(() => {});
                    }, 3000);
                });
            });
        } else if (postbackPayload == 'NUTRIENTE') {
            smooch.appUsers.sendMessage(appUserId, {
                text: 'Los Nutrientes son parte importante en la esencia de la vida y regeneracion celular. ¿qué grupos de NUTRIGENÓMICOS te gustaria explorar?',
                role: 'appMaker',
                type: 'text'
            }).then(() => {
                smooch.appUsers.sendMessage(appUserId, {
                    role: 'appMaker',
                    type: 'carousel',
                    items: [{
                        title: 'Antiinflamatorio',
                        actions: [{
                            text: 'Seleccionar',
                            type: 'postback',
                            payload: 'ANTIINFLAMATORIO'
                        }]
                    }, {
                        title: 'Antioxidantes',
                        actions: [{
                            text: 'Seleccionar',
                            type: 'postback',
                            payload: 'ANTIOXIDANTE'
                        }]
                    }, {
                        title: 'Belleza',
                        actions: [{
                            text: 'Seleccionar',
                            type: 'postback',
                            payload: 'BELLEZA'
                        }]
                    }, {
                        title: 'Estado anímico',
                        actions: [{
                            text: 'Seleccionar',
                            type: 'postback',
                            payload: 'ESTADO_ANIMICO'
                        }]
                    }, {
                        title: 'Fuerza',
                        actions: [{
                            text: 'Seleccionar',
                            type: 'postback',
                            payload: 'FUERZA'
                        }]
                    }, {
                        title: 'Memoria',
                        actions: [{
                            text: 'Seleccionar',
                            type: 'postback',
                            payload: 'MEMORIA'
                        }]
                    }, {
                        title: 'Pérdida de peso',
                        actions: [{
                            text: 'Seleccionar',
                            type: 'postback',
                            payload: 'PERDIDA_PESO'
                        }]
                    }, {
                        title: 'Prevención de enfermedades',
                        actions: [{
                            text: 'Seleccionar',
                            type: 'postback',
                            payload: 'PREVENCION_ENFERMEDAD'
                        }]
                    }]
                }).then(() => {});
            });
        } else if (postbackPayload == 'ANTIINFLAMATORIO') {
            smooch.appUsers.sendMessage(appUserId, {
                text: 'Gracias, estas son los mejores nutrientes para Antiinflamatorio: \nÁcido fólico\nAntocianidinas\nCarotenoides\n\n¿Desea validar otro nutriente?',
                role: 'appMaker',
                type: 'text',
                actions: [{
                    type: 'reply',
                    text: 'Si',
                    payload: 'NUTRIENTE'
                }, {
                    type: 'reply',
                    text: 'No',
                    payload: 'RETORNO_PRINCIPAL'
                }]
            }).then(() => {});
        } else if (postbackPayload == 'ANTIOXIDANTE') {
            smooch.appUsers.sendMessage(appUserId, {
                text: 'Gracias, estas son los mejores nutrientes para Antioxidante: \nBetacaroteno\nCatequinas\nCurcumina\n\n¿Desea validar otro nutriente?',
                role: 'appMaker',
                type: 'text',
                actions: [{
                    type: 'reply',
                    text: 'Si',
                    payload: 'NUTRIENTE'
                }, {
                    type: 'reply',
                    text: 'No',
                    payload: 'RETORNO_PRINCIPAL'
                }]
            }).then(() => {});
        } else if (postbackPayload == 'BELLEZA') {
            smooch.appUsers.sendMessage(appUserId, {
                text: 'Gracias, estas son los mejores nutrientes para Belleza: \nLicopeno\nLuteína y zeaxantina\nOmega 3\n\n¿Desea validar otro nutriente?',
                role: 'appMaker',
                type: 'text',
                actions: [{
                    type: 'reply',
                    text: 'Si',
                    payload: 'NUTRIENTE'
                }, {
                    type: 'reply',
                    text: 'No',
                    payload: 'RETORNO_PRINCIPAL'
                }]
            }).then(() => {});
        } else if (postbackPayload == 'ESTADO_ANIMICO') {
            smooch.appUsers.sendMessage(appUserId, {
                text: 'Gracias, estas son los mejores nutrientes para Estado anímico: \nAntocianidinas\nCatequinas\nCurcumina\n\n¿Desea validar otro nutriente?',
                role: 'appMaker',
                type: 'text',
                actions: [{
                    type: 'reply',
                    text: 'Si',
                    payload: 'NUTRIENTE'
                }, {
                    type: 'reply',
                    text: 'No',
                    payload: 'RETORNO_PRINCIPAL'
                }]
            }).then(() => {});
        } else if (postbackPayload == 'FUERZA') {
            smooch.appUsers.sendMessage(appUserId, {
                text: 'Gracias, estas son los mejores nutrientes para Fuerza: \nMagnesio\nOmega 3\nPotasio\n\n¿Desea validar otro nutriente?',
                role: 'appMaker',
                type: 'text',
                actions: [{
                    type: 'reply',
                    text: 'Si',
                    payload: 'NUTRIENTE'
                }, {
                    type: 'reply',
                    text: 'No',
                    payload: 'RETORNO_PRINCIPAL'
                }]
            }).then(() => {});
        } else if (postbackPayload == 'MEMORIA') {
            smooch.appUsers.sendMessage(appUserId, {
                text: 'Gracias, estas son los mejores nutrientes para Memoria: \nPotasio\nSelenio\nVitamina B12\n\n¿Desea validar otro nutriente?',
                role: 'appMaker',
                type: 'text',
                actions: [{
                    type: 'reply',
                    text: 'Si',
                    payload: 'NUTRIENTE'
                }, {
                    type: 'reply',
                    text: 'No',
                    payload: 'RETORNO_PRINCIPAL'
                }]
            }).then(() => {});
        } else if (postbackPayload == 'PERDIDA_PESO ') {
            smooch.appUsers.sendMessage(appUserId, {
                text: 'Gracias, estas son los mejores nutrientes para Pérdida de peso: \nCurcumina\nFibra\nPotasio\n\n¿Desea validar otro nutriente?',
                role: 'appMaker',
                type: 'text',
                actions: [{
                    type: 'reply',
                    text: 'Si',
                    payload: 'NUTRIENTE'
                }, {
                    type: 'reply',
                    text: 'No',
                    payload: 'RETORNO_PRINCIPAL'
                }]
            }).then(() => {});
        } else if (postbackPayload == 'PREVENCION_ENFERMEDAD ') {
            smooch.appUsers.sendMessage(appUserId, {
                text: 'Gracias, estas son los mejores nutrientes para Prevención de enfermedades: \nCurcumina\nFibra\nFitoestrógenos\n\n¿Desea validar otro nutriente?',
                role: 'appMaker',
                type: 'text',
                actions: [{
                    type: 'reply',
                    text: 'Si',
                    payload: 'NUTRIENTE'
                }, {
                    type: 'reply',
                    text: 'No',
                    payload: ''
                }]
            }).then(() => {});
        } else if (postbackPayload == 'FORMA_ACTIVARSE') {
            smooch.appUsers.sendMessage(appUserId, {
                role: "appMaker",
                type: "list",
                items: [{
                        title: "Tenga prisa.",
                        description: "Caminar rápidamente quema más calorías que un paseo lento. Convierta en un juego el ver qué tan rápido puede llegar a su destino",
                        size: "large",
                        actions: [{
                            text: "Tenga prisa!",
                            type: "postback",
                            payload: "MANTENERSE_ACTIVO"
                        }]
                    },
                    {
                        title: "Póngase los zapatos de pié.",
                        description: "Intente ponerse el calcetín, el zapato y atar sus agujetas sin permitir que su pie toque el suelo.",
                        actions: [{
                            text: "De pié!",
                            type: "postback",
                            payload: "MANTENERSE_ACTIVO"
                        }]
                    },
                    {
                        title: "Tome las escaleras.",
                        description: "Subir escaleras es una de las actividades más fáciles que puede hacer para quemar calorías sin tener que ir al gimnasio.",
                        actions: [{
                            text: "Escaleras!",
                            type: "postback",
                            payload: "MANTENERSE_ACTIVO"
                        }]
                    }
                ]
            }).then(() => {
                smooch.appUsers.sendMessage(appUserId, {
                    text: '¿Te puedo ayudar en algo más?',
                    role: 'appMaker',
                    type: 'text',
                    actions: [{
                        type: 'reply',
                        text: 'Si',
                        payload: 'MANTENERSE_ACTIVO'
                    }, {
                        type: 'reply',
                        text: 'No',
                        payload: 'NO'
                    }]
                }).then(() => {});
            });
        } else if (postbackPayload == 'YOGA') {
            smooch.appUsers.sendMessage(appUserId, {
                text: 'Nos encanta el YOGA, aca te compartimos algunos ejercicios que puedes desarrollar todos los días.',
                role: 'appMaker',
                type: 'text'
            }).then((response) => {
                smooch.appUsers.sendMessage(appUserId, {
                    role: "appMaker",
                    type: "list",
                    items: [{
                            title: nombreUsuario + ", conéctate contigo mismo!",
                            mediaUrl: "https://southtech.pe/zabiatest/imagen/icono/contigo_mismo.jpeg",
                            mediaType: 'image/jpeg',
                            size: "large",
                            actions: [{
                                text: "Contigo mismo!",
                                type: "postback",
                                payload: "MANTENERSE_ACTIVO"
                            }]
                        },
                        {
                            title: "Estirate, oxigenate y busca tu centro",
                            description: 'Te sentiras muy bien luego.',
                            mediaUrl: "https://southtech.pe/zabiatest/imagen/icono/busca_tu_centro.jpeg",
                            mediaType: 'image/jpeg',
                            actions: [{
                                text: "Busca tu centro!",
                                type: "postback",
                                payload: "MANTENERSE_ACTIVO"
                            }]
                        }
                    ]
                }).then(() => {
                    smooch.appUsers.sendMessage(appUserId, {
                        text: '¿Te puedo ayudar en algo más?',
                        role: 'appMaker',
                        type: 'text',
                        actions: [{
                            type: 'reply',
                            text: 'Si',
                            payload: 'MANTENERSE_ACTIVO'
                        }, {
                            type: 'reply',
                            text: 'No',
                            payload: 'NO'
                        }]
                    }).then(() => {});
                });
            });
        } else if (postbackPayload == 'MEDITACION') {
            smooch.appUsers.sendMessage(appUserId, {
                text: 'Una excelente manera de activar tus sentidos y novelar tus emociones el dia de hoy, no dejes de practicarlo a diario',
                role: 'appMaker',
                type: 'text'
            }).then((response) => {
                smooch.appUsers.sendMessage(appUserId, {
                    role: "appMaker",
                    type: "list",
                    items: [{
                            title: "Silencio y meditación",
                            mediaUrl: "https://southtech.pe/zabiatest/imagen/icono/meditacion1.jpeg",
                            mediaType: 'image/jpeg',
                            size: "large",
                            actions: [{
                                text: "Silencio y meditación!",
                                type: "postback",
                                payload: "MANTENERSE_ACTIVO"
                            }]
                        },
                        {
                            title: "Minfulness",
                            mediaUrl: "https://southtech.pe/zabiatest/imagen/icono/meditacion2.jpeg",
                            mediaType: 'image/jpeg',
                            actions: [{
                                text: "Minfulness!",
                                type: "postback",
                                payload: "MANTENERSE_ACTIVO"
                            }]
                        }
                    ]
                }).then(() => {
                    smooch.appUsers.sendMessage(appUserId, {
                        text: '¿Te puedo ayudar en algo más?',
                        role: 'appMaker',
                        type: 'text',
                        actions: [{
                            type: 'reply',
                            text: 'Si',
                            payload: 'MANTENERSE_ACTIVO'
                        }, {
                            type: 'reply',
                            text: 'No',
                            payload: 'NO'
                        }]
                    }).then(() => {});
                });
            });
        } else if (postbackPayload == 'TIP_ACTIVARSE') {
            smooch.appUsers.sendMessage(appUserId, {
                text: 'Con gusto ' + nombreUsuario + ', este es nuestro mejor consejo para ti el dia de hoy!',
                role: 'appMaker',
                type: 'text'
            }).then(() => {
                smooch.appUsers.sendMessage(appUserId, {
                    type: 'image',
                    mediaUrl: 'https://southtech.pe/zabiatest/imagen/icono/tip_consejo.jpeg',
                    role: 'appMaker'
                }).then(() => {
                    setTimeout(() => {
                        smooch.appUsers.sendMessage(appUserId, {
                            text: '¿Te puedo ayudar en algo más?',
                            role: 'appMaker',
                            type: 'text',
                            actions: [{
                                type: 'reply',
                                text: 'Si',
                                payload: 'MANTENERSE_ACTIVO'
                            }, {
                                type: 'reply',
                                text: 'No',
                                payload: 'NO'
                            }]
                        }).then(() => {});
                    }, 3000);
                });
            });
        } else {
            smooch.appUsers.sendMessage(appUserId, {
                text: 'implementando...',
                role: 'appMaker',
                type: 'text'
            });
        }

        postbackPayload = '';
    }

});

// Listen on port
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});