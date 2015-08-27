(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.OptxLoaderAwd = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
!function(a) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = a(); else if ("function" == typeof define && define.amd) define([], a); else {
        var b;
        b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, 
        b.awdlib_optx = a();
    }
}(function() {
    return function a(b, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!b[g]) {
                    var i = "function" == typeof _dereq_ && _dereq_;
                    if (!h && i) return i(g, !0);
                    if (f) return f(g, !0);
                    var j = new Error("Cannot find module '" + g + "'");
                    throw j.code = "MODULE_NOT_FOUND", j;
                }
                var k = c[g] = {
                    exports: {}
                };
                b[g][0].call(k.exports, function(a) {
                    var c = b[g][1][a];
                    return e(c ? c : a);
                }, k, k.exports, a, b, c, d);
            }
            return c[g].exports;
        }
        for (var f = "function" == typeof _dereq_ && _dereq_, g = 0; g < d.length; g++) e(d[g]);
        return e;
    }({
        1: [ function(a, module, exports) {
            var b = a("optx/_awdlib").get(), c = b.consts, d = b.BaseElement, e = b.userAttr, f = a("optx/extInfos"), g = a("optx/Container"), h = 0, i = 1, j = d.createStruct(f.OPTX_CAMERA, f.URI, {
                init: function() {
                    this.model = c.MODEL_CAMERA, g["super"](this), this.name = "", this.extras = new e(), 
                    this.lensType = h, this.near = .1, this.far = 1e3, this.fov = 60, this.minX = -20, 
                    this.maxX = 20, this.minY = -20, this.maxY = 20, this.post = null;
                },
                makePerspective: function(a, b, c) {
                    this.lensType = h, this.fov = a, this.near = b, this.far = c;
                },
                makeOrtho: function(a, b, c, d, e, f) {
                    this.lensType = i, this.minX = a, this.maxX = b, this.minY = c, this.maxY = d, this.near = e, 
                    this.far = f;
                },
                read: function(a) {
                    this.readNodeCommon(a);
                    var b = a.U32();
                    if (this.lensType = a.U8(), this.near = a.F32(), this.far = a.F32(), this.lensType === h ? this.fov = a.F32() : this.lensType === i && (this.minX = a.F32(), 
                    this.maxX = a.F32(), this.minY = a.F32(), this.maxY = a.F32()), this.extras.read(a), 
                    b > 0) {
                        var d = this.awd.getAssetByID(b, [ c.MODEL_GENERIC ]);
                        if (d[0]) return d[1];
                        throw new Error("Could not find Post for this Camera, uid : " + b);
                    }
                    return null;
                },
                write: void 0,
                getDependencies: function() {
                    var a = this.getGraphDependencies();
                    return this.post && a.push(this.post), a;
                },
                toString: function() {
                    return "[Camera " + this.name + "]";
                }
            });
            j.LENS_PERSPECTIVE = h, j.LENS_ORTHOGRAPHIC = i, g.extend(j.prototype), module.exports = j;
        }, {
            "optx/Container": 3,
            "optx/_awdlib": 13,
            "optx/extInfos": 15
        } ],
        2: [ function(a, module, exports) {
            function b(a) {
                var b, c = 3 & a >>> 6, d = 3 & a >>> 4, e = 3 & a >>> 2, f = 3 & a;
                return b = d === c ? e === c ? f === c ? i[f] : i[f] + i[e] : i[f] + i[e] + i[d] : i[f] + i[e] + i[d] + i[c];
            }
            var c = a("optx/_awdlib").get(), d = c.awdString, e = c.consts, f = c.BaseElement, g = c.userAttr, h = a("optx/extInfos"), i = [ "r", "g", "b", "a" ], j = f.createStruct(h.OPTX_COMPOSITE_TEXTURE, h.URI, {
                init: function() {
                    this.model = e.MODEL_TEXTURE, this.name = "", this.extras = new g(), this.components = null;
                },
                resolveTexture: function(a) {
                    var b = this.awd.getAssetByID(a, [ e.MODEL_TEXTURE ]);
                    if (b[0]) return b[1];
                    throw new Error("Could not find referenced Texture for this CompositeTexture, uid : " + a);
                },
                read: function(a) {
                    this.name = d.read(a);
                    var c = a.U8();
                    this.components = [];
                    for (var e = 0; c > e; e++) this.components.push({
                        out: b(a.U8()),
                        comps: b(a.U8()),
                        tex: this.resolveTexture(a.U32())
                    });
                    this.extras.read(a);
                },
                assertValid: function() {
                    if (null == this.components) throw new Error("CompositeTexture.write -  components are not defined");
                },
                write: void 0,
                getDependencies: function() {
                    return this.assertValid(), this.components.map(function(a) {
                        return a.tex;
                    });
                },
                toString: function() {
                    return "[CompositeTexture " + this.name + "]";
                }
            });
            module.exports = j;
        }, {
            "optx/_awdlib": 13,
            "optx/extInfos": 15
        } ],
        3: [ function(a, module, exports) {
            var b = a("optx/_awdlib").get(), c = b.awdString, d = b.consts, e = b.BaseElement, f = b.vec3, g = b.matrix, h = e.createStruct(-1, null, {
                init: function() {
                    this.model = d.MODEL_CONTAINER, h["super"](this);
                },
                readNodeCommon: function(a) {
                    var b = a.U32();
                    this.matrix.read(this.awd, a), this.pivot.parsePivot(this.awd, a), this.name = c.read(a);
                    var e = this.awd.getAssetByID(b, [ d.MODEL_CONTAINER, d.MODEL_MESH, d.MODEL_LIGHT, d.MODEL_ENTITY, d.MODEL_SEGMENT_SET ]);
                    if (e[0]) void 0 !== e[1].addChild && e[1].addChild(this), this.parent = e[1]; else if (b > 0) throw new Error("Could not find a parent for this Container id : " + b);
                },
                writeNodeCommon: void 0,
                getGraphDependencies: function() {
                    var a = this.parent;
                    return a ? [ a ] : [];
                },
                toString: function() {
                    return "[Container " + this.name + "]";
                },
                addChild: function(a) {
                    -1 === this.children.indexOf(a) && (this.children.push(a), a.parent = this);
                },
                removeChild: function(a) {
                    var b = this.children.indexOf(a);
                    b > -1 && (this.children.splice(b, 1), a.parent = null);
                }
            });
            h.extend = function(a) {
                a.addChild = h.prototype.addChild, a.removeChild = h.prototype.removeChild, a.writeNodeCommon = h.prototype.writeNodeCommon, 
                a.readNodeCommon = h.prototype.readNodeCommon, a.getGraphDependencies = h.prototype.getGraphDependencies;
            }, h["super"] = function(a) {
                a.parent = null, a.children = [], a.matrix = new g(), a.name = "", a.pivot = new f();
            }, module.exports = h;
        }, {
            "optx/_awdlib": 13
        } ],
        4: [ function(a, module, exports) {
            function b(a) {
                return a === i ? 28 : 27;
            }
            var c = a("optx/_awdlib").get(), d = c.consts, e = c.BaseElement, f = c.userAttr, g = a("optx/extInfos"), h = a("optx/Container"), i = 0, j = e.createStruct(g.OPTX_ENV, g.URI, {
                init: function() {
                    this.model = d.MODEL_CONTAINER, h["super"](this), this.name = "", this.extras = new f(), 
                    this.shCoefs = null, this.brightness = 1, this.envMap = null;
                },
                read: function(a) {
                    this.readNodeCommon(a);
                    var c = a.U32(), e = a.U8(), f = b(e);
                    this.shCoefs = new Float32Array(f);
                    for (var g = 0; f > g; g++) this.shCoefs[g] = a.F32();
                    this.brightness = a.F32(), this.extras.read(a);
                    var h = this.awd.getAssetByID(c, [ d.MODEL_TEXTURE ]);
                    if (!h[0] && h > 0) throw new Error("Could not find EnvMap (ID = " + c + " ) for this Env");
                    c > 0 && (this.envMap = h[1]);
                },
                write: void 0,
                getDependencies: function() {
                    var a = this.getGraphDependencies();
                    return this.envMap && a.push(this.envMap), a;
                },
                toString: function() {
                    return "[Env " + this.name + "]";
                }
            });
            h.extend(j.prototype), module.exports = j;
        }, {
            "optx/Container": 3,
            "optx/_awdlib": 13,
            "optx/extInfos": 15
        } ],
        5: [ function(a, module, exports) {
            function b() {
                this.data = null, this.mime = "application/octet-stream", this.uri = "";
            }
            var c = a("optx/_awdlib").get(), d = c.awdString;
            b.prototype.read = function(a) {
                this.mime = d.read(a), this.uri = d.read(a);
                var b = a.U32();
                this.data = a.subArray(b);
            }, module.exports = b;
        }, {
            "optx/_awdlib": 13
        } ],
        6: [ function(a, module, exports) {
            function b() {
                this.data = null, this.attributes = [];
            }
            function c() {
                this.data = null, this.glType = 0, this.usage = 1;
            }
            function d() {
                this.name = "", this.numElems = 0, this.glType = 0, this.flags = 0;
            }
            function e(a) {
                switch (a) {
                  case 5120:
                  case 5121:
                    return 1;

                  case 5122:
                  case 5123:
                    return 2;

                  case 5124:
                  case 5125:
                  case 5126:
                    return 4;
                }
                throw new Error("WARN getTypeSize - unexpected stream data type " + a);
            }
            var f = a("optx/_awdlib").get(), g = f.BaseElement, h = f.consts, i = f.awdString, j = f.userAttr, k = f.properties, l = a("optx/extInfos"), m = g.createStruct(l.OPTX_GEOM, l.URI, {
                init: function() {
                    this.model = h.MODEL_GEOMETRY, this.name = "", this.extras = new j(), this.props = new k({}), 
                    this.vertexBuffers = [], this.indexBuffers = [];
                },
                read: function(a) {
                    this.name = i.read(a);
                    var d = a.U16(), e = a.U16(), f = this.props;
                    f.read(a);
                    var g, h, j = this.vertexBuffers, k = this.indexBuffers;
                    for (g = 0; d > g; g++) h = new b(), h.read(this.awd, a), j.push(h);
                    for (g = 0; e > g; g++) h = new c(), h.read(this.awd, a), k.push(h);
                    this.extras.read(a);
                },
                write: void 0,
                toString: function() {
                    return "[OptxGeometry " + this.name + "]";
                }
            });
            b.prototype = {
                read: function(a, b) {
                    for (var c = b.U32(), e = b.U16(), f = 0; e > f; f++) {
                        var g = new d();
                        g.read(b), this.attributes.push(g);
                    }
                    this.data = b.subArray(c);
                },
                write: void 0
            }, c.prototype = {
                read: function(a, b) {
                    var c = b.U32();
                    this.glType = b.U16(), this.usage = b.U8(), this.data = b.subArray(c);
                },
                write: function(a, b) {
                    b.U32(this.data.byteLength), b.U16(this.glType), b.U8(this.usage), b.writeSub(this.data);
                }
            }, c.TRIANGLE_USAGE = 1, c.WIREFRAME_USAGE = 2, d.FLAG_NORMALIZED = 2, d.prototype = {
                read: function(a) {
                    this.name = i.read(a), this.numElems = a.U8(), this.glType = a.U16(), this.flags = a.U8();
                },
                write: function(a) {
                    i.write(this.name, a), a.U8(this.numElems), a.U16(this.glType), a.U8(this.flags);
                },
                setFlag: function(a, b) {
                    b ? this.flags = this.flags | a : this.flags = this.flags & ~a;
                },
                getFlag: function(a) {
                    return 0 !== (this.flags & a);
                },
                getBytesSize: function() {
                    return e(this.glType) * this.numElems;
                }
            }, m.types = {
                BYTE: 5120,
                UNSIGNED_BYTE: 5121,
                SHORT: 5122,
                UNSIGNED_SHORT: 5123,
                INT: 5124,
                UNSIGNED_INT: 5125,
                FLOAT: 5126
            }, m.VertexBuffer = b, m.IndexBuffer = c, m.VertexAttibute = d, m.getGLTypeBytesSize = e, 
            module.exports = m;
        }, {
            "optx/_awdlib": 13,
            "optx/extInfos": 15
        } ],
        7: [ function(a, module, exports) {
            var b = a("optx/_awdlib").get(), c = b.consts, d = b.BaseElement, e = b.userAttr, f = b.properties, g = a("optx/extInfos"), h = a("optx/Container"), i = 1, j = 2, k = 3, l = 4, m = 5, n = 6, o = {};
            o[i] = c.AWD_FIELD_FLOAT32, o[j] = c.AWD_FIELD_FLOAT32, o[k] = c.AWD_FIELD_FLOAT32, 
            o[l] = c.AWD_FIELD_FLOAT32, o[m] = c.AWD_FIELD_FLOAT32, o[n] = c.AWD_FIELD_BOOL;
            var p = d.createStruct(g.OPTX_LIGHT, g.URI, {
                init: function() {
                    this.model = c.MODEL_LIGHT, h["super"](this), this.name = "", this.extras = new e(), 
                    this.shadow = !0, this.color = [ 1, 1, 1 ], this.radius = 50, this.falloffCurve = 2, 
                    this.spotAngle = 70, this.spotShapness = 0;
                },
                read: function(a) {
                    this.readNodeCommon(a);
                    var b = new f(o);
                    b.read(a), this.readProps(b), this.extras.read(a);
                },
                write: void 0,
                setupProps: function(a) {
                    a.set(i, this.color), a.set(j, this.radius), a.set(k, this.falloffCurve), a.set(l, this.spotAngle), 
                    a.set(m, this.spotShapness), a.set(n, this.shadow);
                },
                readProps: function(a) {
                    this.color = a.get(i, this.color), this.radius = a.get(j, this.radius), this.falloffCurve = a.get(k, this.falloffCurve), 
                    this.spotAngle = a.get(l, this.spotAngle), this.spotShapness = a.get(m, this.spotShapness), 
                    this.shadow = !!a.get(n, this.shadow);
                },
                getDependencies: function() {
                    return this.getGraphDependencies();
                },
                toString: function() {
                    return "[Light " + this.name + "]";
                }
            });
            h.extend(p.prototype), module.exports = p;
        }, {
            "optx/Container": 3,
            "optx/_awdlib": 13,
            "optx/extInfos": 15
        } ],
        8: [ function(a, module, exports) {
            var b = a("optx/_awdlib").get(), c = b.awdString, d = b.consts, e = b.BaseElement, f = b.userAttr, g = b.properties, h = a("optx/extInfos"), i = 1, j = 2, k = 3, l = 4, m = 5, n = 6, o = 7, p = 8, q = 9, r = 10, s = 11, t = 12, u = 13, v = 14, w = 15, x = 16, y = 17, z = 18, A = 19, B = 20, C = 21, D = 22, E = {};
            E[i] = d.AWD_FIELD_STRING, E[j] = d.AWD_FIELD_FLOAT32, E[k] = d.AWD_FIELD_BOOL, 
            E[l] = d.AWD_FIELD_FLOAT32, E[m] = d.AWD_FIELD_FLOAT32, E[n] = d.AWD_FIELD_BOOL, 
            E[o] = d.AWD_FIELD_BOOL, E[p] = d.AWD_FIELD_BOOL, E[q] = d.AWD_FIELD_BOOL, E[r] = d.AWD_FIELD_FLOAT32, 
            E[s] = d.AWD_FIELD_FLOAT32, E[t] = d.AWD_FIELD_FLOAT32, E[u] = d.AWD_FIELD_BOOL, 
            E[v] = d.AWD_FIELD_FLOAT32, E[w] = d.AWD_FIELD_FLOAT32, E[x] = d.AWD_FIELD_FLOAT32, 
            E[y] = d.AWD_FIELD_FLOAT32, E[z] = d.AWD_FIELD_FLOAT32, E[A] = d.AWD_FIELD_FLOAT32, 
            E[B] = d.AWD_FIELD_FLOAT32, E[C] = d.AWD_FIELD_FLOAT32, E[D] = d.AWD_FIELD_BOOL;
            var F = e.createStruct(h.OPTX_MATERIAL, h.URI, {
                init: function() {
                    this.model = d.MODEL_MATERIAL, this.name = "", this.extras = new f(), this.textures = {
                        albedo: null,
                        reflectivity: null,
                        normal: null,
                        subsurface: null,
                        agt: null
                    }, this.colors = {
                        albedo: 4278190080,
                        reflectivity: 4278190080,
                        normal: 4278190080,
                        subsurface: 4278190080,
                        agt: 4278190080
                    }, this.blend = "none", this.alphaThreshold = 0, this.dithering = !1, this.fresnel = [ 1, 1, 1 ], 
                    this.horizonOcclude = 0, this.vertexColor = !1, this.vertexColorAlpha = !1, this.vertexColorSRGB = !1, 
                    this.aniso = !1, this.anisoStrength = 1, this.anisoIntegral = .5, this.anisoTangent = [ 1, 0, 0 ], 
                    this.subsurface = !1, this.subsurfaceColor = [ 1, 1, 1 ], this.transColor = [ 1, 0, 0, .5 ], 
                    this.fresnelColor = [ .2, .2, .2, .5 ], this.fresnelOcc = 1, this.fresnelGlossMask = 1, 
                    this.transSky = .5, this.shadowBlur = .5, this.normalSmooth = .5, this.unlit = !1;
                },
                read: function(a) {
                    this.name = c.read(a), this.textures.albedo = this.readTexture(a), this.textures.reflectivity = this.readTexture(a), 
                    this.textures.normal = this.readTexture(a), this.textures.subsurface = this.readTexture(a), 
                    this.textures.agt = this.readTexture(a), this.colors.albedo = a.U32(), this.colors.reflectivity = a.U32(), 
                    this.colors.normal = a.U32(), this.colors.subsurface = a.U32(), this.colors.agt = a.U32();
                    var b = new g(E);
                    b.read(a), this.readProps(b), this.extras.read(a);
                },
                write: void 0,
                readTexture: function(a) {
                    var b = a.U32();
                    if (b > 0) {
                        var c = this.awd.getAssetByID(b, [ d.MODEL_TEXTURE ]);
                        if (c[0]) return c[1];
                        throw new Error("Could not find Texture for this Material, uid : " + b);
                    }
                    return null;
                },
                writeTexture: void 0,
                setupProps: void 0,
                readProps: function(a) {
                    this.blend = a.get(i, this.blend), this.alphaThreshold = a.get(j, this.alphaThreshold), 
                    this.dithering = !!a.get(k, this.dithering), this.fresnel = a.get(l, this.fresnel), 
                    this.horizonOcclude = a.get(m, this.horizonOcclude), this.vertexColor = !!a.get(n, this.vertexColor), 
                    this.vertexColorAlpha = !!a.get(o, this.vertexColorAlpha), this.vertexColorSRGB = !!a.get(p, this.vertexColorSRGB), 
                    this.aniso = !!a.get(q, this.aniso), this.anisoStrength = a.get(r, this.anisoStrength), 
                    this.anisoIntegral = a.get(s, this.anisoIntegral), this.anisoTangent = a.get(t, this.anisoTangent), 
                    this.subsurface = !!a.get(u, this.subsurface), this.subsurfaceColor = a.get(v, this.subsurfaceColor), 
                    this.transColor = a.get(w, this.transColor), this.fresnelColor = a.get(x, this.fresnelColor), 
                    this.fresnelOcc = a.get(y, this.fresnelOcc), this.fresnelGlossMask = a.get(z, this.fresnelGlossMask), 
                    this.transSky = a.get(A, this.transSky), this.shadowBlur = a.get(B, this.shadowBlur), 
                    this.normalSmooth = a.get(C, this.normalSmooth), this.unlit = !!a.get(D, this.unlit);
                },
                getDependencies: void 0,
                toString: function() {
                    return "[Material " + this.pData.name + "]";
                }
            });
            module.exports = F;
        }, {
            "optx/_awdlib": 13,
            "optx/extInfos": 15
        } ],
        9: [ function(a, module, exports) {
            function b() {
                this.material = null, this.firstIndex = 0, this.indexCount = 0, this.firstWireIndex = 0, 
                this.wireIndexCount = 0;
            }
            var c = a("optx/_awdlib").get(), d = c.consts, e = c.BaseElement, f = c.userAttr, g = c.properties, h = a("optx/extInfos"), i = a("optx/Container"), j = {
                cullBackFaces: 1,
                castShadows: 2,
                bounds: 10
            }, k = e.createStruct(h.OPTX_MESH, h.URI, {
                init: function() {
                    this.model = d.MODEL_MESH, i["super"](this), this.geometry = null, this.extras = new f(), 
                    this.props = new g({
                        1: d.AWD_FIELD_BOOL,
                        2: d.AWD_FIELD_BOOL,
                        10: d.AWD_FIELD_FLOAT32
                    }), this.submeshes = [];
                },
                read: function(a) {
                    this.readNodeCommon(a);
                    var c = a.U32();
                    this.props.read(a);
                    for (var e = a.U16(), f = 0; e > f; f++) {
                        var g = new b();
                        g.read(this.awd, a), this.submeshes.push(g);
                    }
                    this.extras.read(a);
                    var h = this.awd.getAssetByID(c, [ d.MODEL_GEOMETRY ]);
                    h[0] && (this.geometry = h[1]);
                },
                write: void 0,
                getCullBackFace: function() {
                    return 1 === this.props.get(j.cullBackFaces, !0);
                },
                setCullBackFace: function(a) {
                    this.props.set(j.cullBackFaces, a);
                },
                getCastShadows: function() {
                    return 1 === this.props.get(j.castShadows, !1);
                },
                setCastShadows: function(a) {
                    this.props.set(j.castShadows, a);
                },
                getDependencies: function() {
                    for (var a = this.getGraphDependencies(), b = this.submeshes.length, c = 0; b > c; c++) {
                        var d = this.submeshes[c].material;
                        d && a.push(d);
                    }
                    return this.geometry && a.push(this.geometry), a;
                },
                toString: function() {
                    return "[Mesh " + this.pData.name + "]";
                }
            });
            b.prototype = {
                read: function(a, b) {
                    var c = b.U32();
                    this.firstIndex = b.U32(), this.indexCount = b.U32(), this.firstWireIndex = b.U32(), 
                    this.wireIndexCount = b.U32();
                    var e = a.getAssetByID(c, [ d.MODEL_MATERIAL ]);
                    if (!e[0] && c > 0) throw new Error("Could not find Material (ID = " + c + " ) for this SubMesh");
                    c > 0 && (this.material = e[1]);
                },
                write: function(a, b) {
                    var c = 0, d = this.material;
                    d && (c = d.chunk.id), b.U32(c), b.U32(this.firstIndex), b.U32(this.indexCount), 
                    b.U32(this.firstWireIndex), b.U32(this.wireIndexCount);
                }
            }, i.extend(k.prototype), k.SubMesh = b, module.exports = k;
        }, {
            "optx/Container": 3,
            "optx/_awdlib": 13,
            "optx/extInfos": 15
        } ],
        10: [ function(a, module, exports) {
            function b(a) {
                var b, k = a.U8();
                switch (k) {
                  case r:
                    b = new c();
                    break;

                  case s:
                    b = new e();
                    break;

                  case t:
                    b = new f();
                    break;

                  case u:
                    b = new g();
                    break;

                  case v:
                    b = new h();
                    break;

                  case w:
                    b = new d();
                    break;

                  case x:
                    b = new i();
                    break;

                  case y:
                    b = new j();
                    break;

                  default:
                    throw new Error("unknown post effect type " + k);
                }
                for (var l = 0; l < b._l; l++) b.props[l] = a.F32();
                return b;
            }
            function c(a, b) {
                this._l = 2, this._id = r, this.props = [ a, b ];
            }
            function d(a, b) {
                this._l = 2, this._id = w, this.props = [ a, b ];
            }
            function e(a, b) {
                this._l = 4, this._id = s, a = a || [ 1, 1, 1 ], this.props = [ a[0], a[1], a[2], b ];
            }
            function f(a, b) {
                this._l = 5, this._id = t, a = a || [ 1, 1, 1, 1 ], this.props = [ a[0], a[1], a[2], a[3], b ];
            }
            function g(a) {
                this._l = 3, this._id = u, a = a || [ 1, 1, 1 ], this.props = [ a[0], a[1], a[2] ];
            }
            function h(a, b, c) {
                this._l = 9, this._id = v, a = a || [ 1, 1, 1 ], b = b || [ 1, 1, 1 ], c = c || [ 1, 1, 1 ], 
                this.props = [ a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2] ];
            }
            function i() {
                this._l = 0, this._id = x, this.props = [];
            }
            function j() {
                this._l = 0, this._id = y, this.props = [];
            }
            var k = a("optx/_awdlib").get(), l = k.consts, m = k.BaseElement, n = k.userAttr, o = k.awdString, p = a("optx/extInfos"), q = m.createStruct(p.OPTX_POST, p.URI, {
                init: function() {
                    this.model = l.MODEL_GENERIC, this.name = "", this.effects = [], this.extras = new n();
                },
                read: function(a) {
                    this.name = o.read(a), this.effects = [];
                    for (var c = a.U8(), d = 0; c > d; d++) this.effects.push(b(a));
                    this.extras.read(a);
                },
                write: void 0,
                getDependencies: function() {
                    return null;
                },
                toString: function() {
                    return "[Post " + this.name + "]";
                }
            }), r = 1, s = 2, t = 3, u = 4, v = 5, w = 6, x = 7, y = 8;
            c.prototype = {
                getAmount: function() {
                    return this.props[0];
                },
                setAmount: function(a) {
                    this.props[0] = a;
                },
                getLimit: function() {
                    return this.props[1];
                },
                setLimit: function(a) {
                    this.props[1] = a;
                }
            }, d.prototype = {
                getAmount: function() {
                    return this.props[0];
                },
                setAmount: function(a) {
                    this.props[0] = a;
                },
                getsharpness: function() {
                    return this.props[1];
                },
                setsharpness: function(a) {
                    this.props[1] = a;
                }
            }, e.prototype = {
                getColor: function() {
                    return this.props.slice(0, 3);
                },
                setColor: function(a) {
                    this.props.splice(0, 3, a[0], a[1], a[2]);
                },
                getSize: function() {
                    return this.props[1];
                },
                setSize: function(a) {
                    this.props[1] = a;
                }
            }, f.prototype = {
                getColor: function() {
                    return this.props.slice(0, 4);
                },
                setColor: function(a) {
                    this.props.splice(0, 4, a[0], a[1], a[2], a[3]);
                },
                getCurve: function() {
                    return this.props[1];
                },
                setCurve: function(a) {
                    this.props[1] = a;
                }
            }, g.prototype = {
                getRgb: function() {
                    return this.props;
                },
                setRgb: function(a) {
                    this.props = a;
                }
            }, h.prototype = {
                getBrightness: function() {
                    return this.props.slice(0, 3);
                },
                setBrightness: function(a) {
                    this.props.splice(0, 3, a[0], a[1], a[2]);
                },
                getContrast: function() {
                    return this.props.slice(3, 6);
                },
                setContrast: function(a) {
                    this.props.splice(3, 3, a[0], a[1], a[2]);
                },
                getBias: function() {
                    return this.props.slice(6, 9);
                },
                setBias: function(a) {
                    this.props.splice(6, 3, a[0], a[1], a[2]);
                }
            }, i.prototype = {}, j.prototype = {}, q.Sharpen = c, q.Bloom = e, q.Vignette = f, 
            q.Saturation = g, q.Contrast = h, q.Grain = d, q.Reinhard = i, q.Hejl = j, module.exports = q;
        }, {
            "optx/_awdlib": 13,
            "optx/extInfos": 15
        } ],
        11: [ function(a, module, exports) {
            var b = a("optx/_awdlib").get(), c = b.consts, d = b.BaseElement, e = b.userAttr, f = a("optx/extInfos"), g = a("optx/Container"), h = 0, i = 1, j = d.createStruct(f.OPTX_SKY, f.URI, {
                init: function() {
                    this.model = c.MODEL_CONTAINER, g["super"](this), this.name = "", this.extras = new e(), 
                    this.brightness = 1, this.env = null, this.skyType = 0;
                },
                useSHMode: function() {
                    this.skyType = h;
                },
                useEnvmapMode: function() {
                    this.skyType = i;
                },
                read: function(a) {
                    this.readNodeCommon(a);
                    var b = a.U32();
                    this.skyType = a.U8(), this.brightness = a.F32(), this.extras.read(a);
                    var d = this.awd.getAssetByID(b, [ c.MODEL_CONTAINER ]);
                    if (!d[0] && d > 0) throw new Error("Could not find env (ID = " + b + " ) for this Sky");
                    b > 0 && (this.env = d[1]);
                },
                write: void 0,
                getDependencies: function() {
                    var a = this.getGraphDependencies();
                    return this.env && a.push(this.env), a;
                },
                toString: function() {
                    return "[Sky " + this.name + "]";
                }
            });
            j.SKY_TYPE_SH = h, j.SKY_TYPE_ENV = i, g.extend(j.prototype), module.exports = j;
        }, {
            "optx/Container": 3,
            "optx/_awdlib": 13,
            "optx/extInfos": 15
        } ],
        12: [ function(a, module, exports) {
            var b = a("optx/_awdlib").get(), c = b.awdString, d = b.consts, e = b.BaseElement, f = b.properties, g = b.userAttr, h = a("optx/extInfos"), i = a("optx/FileData"), j = 1, k = 2, l = 3, m = 4, n = 5, o = {};
            o[j] = d.AWD_FIELD_UINT32, o[k] = d.AWD_FIELD_UINT32, o[l] = d.AWD_FIELD_UINT32, 
            o[m] = d.AWD_FIELD_UINT32, o[n] = d.AWD_FIELD_UINT32;
            var p = e.createStruct(h.OPTX_TEXTURE, h.URI, {
                init: function() {
                    this.model = d.MODEL_TEXTURE, this.name = "", this.extras = new g(), this.fileData = null, 
                    this.uri = null, this.infos = {};
                },
                read: function(a) {
                    this.name = c.read(a);
                    var b = a.U8(), d = !!(1 & b);
                    d ? (this.fileData = new i(), this.fileData.read(a)) : this.uri = c.read(a);
                    var e = new f(o);
                    e.read(a), this.readProps(e), this.extras.read(a);
                },
                write: void 0,
                setupProps: void 0,
                readProps: function(a) {
                    var b = this.infos;
                    b.width = a.get(j, b.width), b.height = a.get(k, b.height), b.glinternalFormat = a.get(l, b.glinternalFormat), 
                    b.glformat = a.get(m, b.glformat), b.gltype = a.get(n, b.gltype);
                },
                getDependencies: function() {
                    return null;
                },
                toString: function() {
                    return "[Texture " + this.name + "]";
                }
            });
            module.exports = p;
        }, {
            "optx/FileData": 5,
            "optx/_awdlib": 13,
            "optx/extInfos": 15
        } ],
        13: [ function(a, module, exports) {
            var b;
            module.exports = {
                set: function(a) {
                    b = a;
                },
                get: function() {
                    return b;
                }
            };
        }, {} ],
        14: [ function(a, module, exports) {
            var b = a("optx/_awdlib").get(), c = b.extension, d = a("optx/Geometry"), e = a("optx/Mesh"), f = a("optx/Material"), g = a("optx/Texture"), h = a("optx/CompositeTexture"), i = a("optx/Light"), j = a("optx/Env"), k = a("optx/Sky"), l = a("optx/Camera"), m = a("optx/Post"), n = a("optx/extInfos"), o = [ d, e, f, g, h, i, j, k, l, m ], p = n;
            p.getExtension = function() {
                var a = new c(n.URI);
                return a.addStructs(o), a;
            }, module.exports = p;
        }, {
            "optx/Camera": 1,
            "optx/CompositeTexture": 2,
            "optx/Env": 4,
            "optx/Geometry": 6,
            "optx/Light": 7,
            "optx/Material": 8,
            "optx/Mesh": 9,
            "optx/Post": 10,
            "optx/Sky": 11,
            "optx/Texture": 12,
            "optx/_awdlib": 13,
            "optx/extInfos": 15
        } ],
        15: [ function(a, module, exports) {
            module.exports = {
                URI: "https://github.com/plepers/optx",
                OPTX_GEOM: 1,
                OPTX_MESH: 2,
                OPTX_MATERIAL: 3,
                OPTX_TEXTURE: 4,
                OPTX_COMPOSITE_TEXTURE: 5,
                OPTX_LIGHT: 6,
                OPTX_ENV: 7,
                OPTX_SKY: 8,
                OPTX_CAMERA: 9,
                OPTX_POST: 10
            };
        }, {} ],
        awdlib_optx: [ function(a, module, exports) {
            module.exports = function(b) {
                return a("optx/_awdlib").set(b), {
                    Camera: a("optx/Camera"),
                    CompositeTexture: a("optx/CompositeTexture"),
                    Container: a("optx/Container"),
                    Env: a("optx/Env"),
                    Geometry: a("optx/Geometry"),
                    Light: a("optx/Light"),
                    Material: a("optx/Material"),
                    Mesh: a("optx/Mesh"),
                    Post: a("optx/Post"),
                    Sky: a("optx/Sky"),
                    Texture: a("optx/Texture"),
                    FileData: a("optx/FileData"),
                    ext: a("optx/ext"),
                    extInfos: a("optx/extInfos")
                };
            };
        }, {
            "optx/Camera": 1,
            "optx/CompositeTexture": 2,
            "optx/Container": 3,
            "optx/Env": 4,
            "optx/FileData": 5,
            "optx/Geometry": 6,
            "optx/Light": 7,
            "optx/Material": 8,
            "optx/Mesh": 9,
            "optx/Post": 10,
            "optx/Sky": 11,
            "optx/Texture": 12,
            "optx/_awdlib": 13,
            "optx/ext": 14,
            "optx/extInfos": 15
        } ]
    }, {}, [])("awdlib_optx");
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(_dereq_,module,exports){
(function (global){
!function(a) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = a(); else if ("function" == typeof define && define.amd) define([], a); else {
        var b;
        b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, 
        b.awdlib = a();
    }
}(function() {
    return function a(b, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!b[g]) {
                    var i = "function" == typeof _dereq_ && _dereq_;
                    if (!h && i) return i(g, !0);
                    if (f) return f(g, !0);
                    var j = new Error("Cannot find module '" + g + "'");
                    throw j.code = "MODULE_NOT_FOUND", j;
                }
                var k = c[g] = {
                    exports: {}
                };
                b[g][0].call(k.exports, function(a) {
                    var c = b[g][1][a];
                    return e(c ? c : a);
                }, k, k.exports, a, b, c, d);
            }
            return c[g].exports;
        }
        for (var f = "function" == typeof _dereq_ && _dereq_, g = 0; g < d.length; g++) e(d[g]);
        return e;
    }({
        1: [ function(a, module, exports) {
            String.prototype.codePointAt || !function() {
                "use strict";
                var a = function() {
                    try {
                        var a = {}, b = Object.defineProperty, c = b(a, a, a) && b;
                    } catch (d) {}
                    return c;
                }(), b = function(a) {
                    if (null == this) throw TypeError();
                    var b = String(this), c = b.length, d = a ? Number(a) : 0;
                    if (d != d && (d = 0), 0 > d || d >= c) return void 0;
                    var e, f = b.charCodeAt(d);
                    return f >= 55296 && 56319 >= f && c > d + 1 && (e = b.charCodeAt(d + 1), e >= 56320 && 57343 >= e) ? 1024 * (f - 55296) + e - 56320 + 65536 : f;
                };
                a ? a(String.prototype, "codePointAt", {
                    value: b,
                    configurable: !0,
                    writable: !0
                }) : String.prototype.codePointAt = b;
            }();
        }, {} ],
        2: [ function(a, module, exports) {
            !function() {
                var b = a("consts"), c = a("chunk"), d = {
                    _setup: function(a, b) {
                        this.awd = a, this.chunk = b, this.id = b.id;
                    },
                    init: function() {
                        this.injectDeps = !1, this.model = b.MODEL_GENERIC;
                    },
                    getDependencies: function() {
                        return this.deps ? this.deps : null;
                    },
                    prepareAndAdd: void 0,
                    prepareChunk: function() {
                        null === this.chunk && (this.chunk = new c()), this.chunk.type = this.type, this.chunk.ns = this.ns;
                    }
                }, e = {};
                e.createStruct = function(a, b, c) {
                    var e = function() {
                        this.type = a, this.nsUri = b, this.ns = 0, this.injectDeps = !0, this.init(), this.chunk = null, 
                        this.id = -1;
                    };
                    e.TYPE = a;
                    var f;
                    for (f in d) e.prototype[f] = d[f];
                    for (f in c) e.prototype[f] = c[f];
                    return e;
                }, module.exports = e;
            }();
        }, {
            chunk: 8,
            consts: 9
        } ],
        3: [ function(a, module, exports) {
            var b = a("consts"), c = a("BaseElement"), d = c.createStruct(b.GENERIC, -1, {
                read: function(a) {
                    this.buf = new ArrayBuffer(this.chunk.size), a.readBytes(this.buf, this.chunk.size), 
                    this.setDeps();
                },
                write: function(a) {
                    a.writeBytes(this.buf, this.chunk.size);
                },
                setDeps: function() {
                    for (var a, b = this.awd._elements, c = [], d = 0, e = b.length; e > d; d++) a = b[d], 
                    c.push(a);
                    this.deps = c;
                },
                prepareAndAdd: void 0,
                prepareChunk: function() {}
            });
            module.exports = d;
        }, {
            BaseElement: 2,
            consts: 9
        } ],
        4: [ function(a, module, exports) {
            !function() {
                var b = a("types/awdString"), c = a("consts"), d = a("BaseElement"), e = d.createStruct(c.NAMESPACE, null, {
                    init: function() {
                        this.uri = "", this.nsId = 0;
                    },
                    read: function(a) {
                        this.nsId = a.U8(), this.uri = b.read(a);
                    },
                    write: void 0
                });
                module.exports = e;
            }();
        }, {
            BaseElement: 2,
            consts: 9,
            "types/awdString": 18
        } ],
        5: [ function(a, module, exports) {
            var b = a("header"), c = a("writer"), d = a("consts"), e = a("chunk"), f = a("bufferReader"), g = a("DefaultElement"), h = function() {
                this.header = new b(), this._elements = [], this._elementsById = [], this._extensions = [];
            };
            h.prototype = {
                addElement: function(a) {
                    this._elements.push(a), this._elementsById[a.id] = a;
                },
                removeElement: function(a) {
                    var b = this._elements.indexOf(a);
                    b > -1 && this._elements.splice(b, 1);
                },
                parse: function(a) {
                    var b, c = new f(a);
                    for (this.header.read(c); c.bytesAvailable() > 0; ) b = this.parseChunk(c);
                },
                write: function() {
                    return c.write(this);
                },
                registerNamespace: function(a) {
                    var b = this.getExtension(a.uri);
                    b && (b.nsId = a.nsId);
                },
                addExtension: function(a) {
                    if (null === this.getExtension(a.nsUri)) {
                        var b, c = this._extensions.push(a), d = a.createNamespace();
                        null !== a.nsUri ? (b = c + 1, this.addElement(d)) : b = 0, d.nsId = a.nsId = b;
                    }
                },
                getExtension: function(a) {
                    for (var b = this._extensions, c = 0, d = b.length; d > c; c++) if (b[c].nsUri === a) return b[c];
                    return null;
                },
                getExtensionById: function(a) {
                    for (var b = this._extensions, c = 0, d = b.length; d > c; c++) if (b[c].nsId === a) return b[c];
                    return null;
                },
                getDatasByType: function(a, b, c) {
                    void 0 === b && (b = null), void 0 === c && (c = []);
                    var d, e;
                    if (a instanceof Array) for (d = 0, e = a.length; e > d; d++) this.getDatasByType(a[d], b, c); else for (d = 0, 
                    e = this._elements.length; e > d; d++) this._elements[d].type === a && this._elements[d].nsUri === b && c.push(this._elements[d]);
                    return c;
                },
                getAssetByID: function(a, b) {
                    var c = [], e = 0, f = this._elementsById;
                    if (a > 0 && f[a]) for (;e < b.length; ) {
                        if (0 !== (f[a].model & b[e])) return c.push(!0), c.push(f[a]), c;
                        if (b[e] === d.MODEL_GEOMETRY && 0 !== (f[a].model & d.MODEL_MESH)) return c.push(!0), 
                        c.push(f[a].geometry), c;
                        e++;
                    }
                    return c.push(!1), c.push(null), c;
                },
                parseChunk: function(a) {
                    var b = new e();
                    b.read(a);
                    var c = this.structFactory(b), f = a.ptr;
                    c.read(a), a.ptr - f !== b.size && (console.log("Warn bad block parsing , byte delta : ", a.ptr - f - b.size), 
                    a.ptr = f + b.size), b.ns === d.DEFAULT_NS && b.type === d.NAMESPACE && this.registerNamespace(c), 
                    this.addElement(c);
                },
                structFactory: function(a) {
                    var b, c = this.getExtensionById(a.ns);
                    return b = c ? c.create(a.type) : new g(), b._setup(this, a), b;
                },
                resolveNamespace: function(a) {
                    if (null == a.nsUri) return 0;
                    var b = this.getExtension(a.nsUri);
                    return b ? b.nsId : (console.log("Missing extension " + a.nsUri), 0);
                }
            }, module.exports = h;
        }, {
            DefaultElement: 3,
            bufferReader: 6,
            chunk: 8,
            consts: 9,
            header: 11,
            writer: 23
        } ],
        6: [ function(a, module, exports) {
            !function() {
                var a = function(a, b, c) {
                    this.buffer = a, this.ptr = 0, this.littleEndien = !0, b = b || 0, c = c || a.byteLength, 
                    this.view = new DataView(a, b, c), this.length = this.view.byteLength;
                };
                a.prototype = {
                    setPosition: function(a) {
                        this.ptr = a;
                    },
                    setLittleEndian: function(a) {
                        this.littleEndien = a;
                    },
                    bytesAvailable: function() {
                        return this.length - this.ptr;
                    },
                    I8: function() {
                        return this.view.getInt8(this.ptr++);
                    },
                    U8: function() {
                        return this.view.getUint8(this.ptr++);
                    },
                    I16: function() {
                        var a = this.view.getInt16(this.ptr, this.littleEndien);
                        return this.ptr += 2, a;
                    },
                    U16: function() {
                        var a = this.view.getUint16(this.ptr, this.littleEndien);
                        return this.ptr += 2, a;
                    },
                    I32: function() {
                        var a = this.view.getInt32(this.ptr, this.littleEndien);
                        return this.ptr += 4, a;
                    },
                    U32: function() {
                        var a = this.view.getUint32(this.ptr, this.littleEndien);
                        return this.ptr += 4, a;
                    },
                    F32: function() {
                        var a = this.view.getFloat32(this.ptr, this.littleEndien);
                        return this.ptr += 4, a;
                    },
                    F64: function() {
                        var a = this.view.getFloat64(this.ptr, this.littleEndien);
                        return this.ptr += 8, a;
                    },
                    readBytes: function(a, b) {
                        void 0 === b && (b = a.byteLength);
                        var c = new Int8Array(a), d = new Int8Array(this.buffer, this.ptr, b);
                        c.set(d), this.ptr += b;
                    },
                    subArray: function(a) {
                        var b = new Int8Array(this.buffer, this.ptr, a);
                        return this.ptr += a, b;
                    },
                    readUTFBytes: function(a) {
                        for (var b, c, d, e = this.ptr + a, f = [], g = 0; this.ptr < e; ) b = this.U8(), 
                        128 > b ? f[g++] = String.fromCharCode(b) : b > 191 && 224 > b ? (c = this.U8(), 
                        f[g++] = String.fromCharCode((31 & b) << 6 | 63 & c)) : (c = this.U8(), d = this.U8(), 
                        f[g++] = String.fromCharCode((15 & b) << 12 | (63 & c) << 6 | 63 & d));
                        return f.join("");
                    }
                }, module.exports = a;
            }();
        }, {} ],
        7: [ function(a, module, exports) {
            module.exports = {};
        }, {
            "string.prototype.codepointat": 1
        } ],
        8: [ function(a, module, exports) {
            !function() {
                var a = function() {
                    this.id = 0, this.ns = 0, this.type = 0, this.flags = 0, this.size = 0, this.data = null;
                };
                a.prototype = {
                    read: function(a) {
                        this.id = a.U32(), this.ns = a.U8(), this.type = a.U8(), this.flags = a.U8(), this.size = a.U32();
                    },
                    write: void 0
                }, module.exports = a;
            }();
        }, {} ],
        9: [ function(a, module, exports) {
            !function() {
                var a = {
                    UNCOMPRESSED: 0,
                    DEFLATE: 1,
                    LZMA: 2,
                    AWD_FIELD_INT8: 1,
                    AWD_FIELD_INT16: 2,
                    AWD_FIELD_INT32: 3,
                    AWD_FIELD_UINT8: 4,
                    AWD_FIELD_UINT16: 5,
                    AWD_FIELD_UINT32: 6,
                    AWD_FIELD_FLOAT32: 7,
                    AWD_FIELD_FLOAT64: 8,
                    AWD_FIELD_BOOL: 21,
                    AWD_FIELD_COLOR: 22,
                    AWD_FIELD_BADDR: 23,
                    AWD_FIELD_STRING: 31,
                    AWD_FIELD_BYTEARRAY: 32,
                    AWD_FIELD_VECTOR2x1: 41,
                    AWD_FIELD_VECTOR3x1: 42,
                    AWD_FIELD_VECTOR4x1: 43,
                    AWD_FIELD_MTX3x2: 44,
                    AWD_FIELD_MTX3x3: 45,
                    AWD_FIELD_MTX4x3: 46,
                    AWD_FIELD_MTX4x4: 47,
                    INT8: 1,
                    INT16: 2,
                    INT32: 3,
                    UINT8: 4,
                    UINT16: 5,
                    UINT32: 6,
                    FLOAT32: 7,
                    FLOAT64: 8,
                    AWDSTRING: 31,
                    AWDBYTEARRAY: 32,
                    MAGIC: 4282180,
                    GENERIC: 0,
                    GEOMETRY: 1,
                    PRIMITIVE: 11,
                    CONTAINER: 22,
                    MESH: 23,
                    MATERIAL: 81,
                    TEXTURE: 82,
                    NAMESPACE: 254,
                    METADATA: 255,
                    MODEL_ENTITY: 2,
                    MODEL_SKYBOX: 4,
                    MODEL_CAMERA: 8,
                    MODEL_SEGMENT_SET: 16,
                    MODEL_MESH: 32,
                    MODEL_GEOMETRY: 64,
                    MODEL_SKELETON: 128,
                    MODEL_SKELETON_POSE: 256,
                    MODEL_CONTAINER: 512,
                    MODEL_TEXTURE: 1024,
                    MODEL_TEXTURE_PROJECTOR: 2048,
                    MODEL_MATERIAL: 4096,
                    MODEL_ANIMATION_SET: 8192,
                    MODEL_ANIMATION_STATE: 16384,
                    MODEL_ANIMATION_NODE: 32768,
                    MODEL_ANIMATOR: 65536,
                    MODEL_STATE_TRANSITION: 1 << 17,
                    MODEL_LIGHT: 1 << 18,
                    MODEL_LIGHT_PICKER: 1 << 19,
                    MODEL_SHADOW_MAP_METHOD: 1 << 20,
                    MODEL_EFFECTS_METHOD: 1 << 21,
                    MODEL_GENERIC: -1,
                    POSITION: 1,
                    INDEX: 2,
                    UVS: 3,
                    NORMAL: 4,
                    TANGENT: 5,
                    JOIN_IDX: 6,
                    JOIN_WGT: 7,
                    SUVS: 8,
                    COLOR: 11,
                    DEFAULT_NS: 0
                };
                module.exports = a;
            }();
        }, {} ],
        10: [ function(a, module, exports) {
            var b = a("DefaultElement"), c = a("Namespace"), d = function(a) {
                this.nsUri = a, this.structs = [], this.nsId = 0;
            };
            d.prototype = {
                addStruct: function(a) {
                    this.structs.push(a);
                },
                addStructs: function(a) {
                    for (var b = 0, c = a.length; c > b; b++) this.addStruct(a[b]);
                },
                create: function(a) {
                    for (var c, d = this.structs, e = 0, f = d.length; f > e; e++) if (c = d[e], c.TYPE === a) return new c();
                    return new b();
                },
                createNamespace: function() {
                    var a = new c();
                    return a.uri = this.nsUri, a;
                }
            }, module.exports = d;
        }, {
            DefaultElement: 3,
            Namespace: 4
        } ],
        11: [ function(a, module, exports) {
            !function() {
                var b = a("consts"), c = function() {
                    this.size = 12, this.version = {
                        major: 0,
                        minor: 0
                    }, this.streaming = !1, this.accuracyMatrix = !1, this.accuracyGeo = !1, this.accuracyProps = !1, 
                    this.geoNrType = b.FLOAT32, this.matrixNrType = b.FLOAT32, this.propsNrType = b.FLOAT32, 
                    this.optimized_for_accuracy = !1, this.compression = !1, this.bodylen = 0;
                };
                c.prototype = {
                    read: function(a) {
                        var c = a.U8() << 16 | a.U8() << 8 | a.U8();
                        if (c !== b.MAGIC) throw new Error("AWD parse error - bad magic " + c.toString(16));
                        var d = this.version;
                        d.major = a.U8(), d.minor = a.U8();
                        var e = a.U16();
                        this.streaming = 1 === (1 & e), this.optimized_for_accuracy = 2 === (2 & e), 2 === d.major && 1 === d.minor && (this.accuracyMatrix = 2 === (2 & e), 
                        this.accuracyGeo = 4 === (4 & e), this.accuracyProps = 8 === (8 & e)), this.geoNrType = this.accuracyGeo ? b.FLOAT64 : b.FLOAT32, 
                        this.matrixNrType = this.accuracyMatrix ? b.FLOAT64 : b.FLOAT32, this.propsNrType = this.accuracyProps ? b.FLOAT64 : b.FLOAT32, 
                        this.compression = a.U8(), this.bodylen = a.U32();
                    },
                    write: void 0
                }, module.exports = c;
            }();
        }, {
            consts: 9
        } ],
        12: [ function(a, module, exports) {
            !function() {
                var a = {}.hasOwnProperty, b = Object.defineProperty, c = function(b, c) {
                    function d() {
                        this.constructor = b;
                    }
                    for (var e in c) a.call(c, e) && (b[e] = c[e]);
                    d.prototype = c.prototype, b.prototype = new d(), b.__super__ = c.prototype;
                }, d = function(a, c, d, e) {
                    b(a, c, {
                        get: d,
                        set: e
                    });
                };
                return {
                    extend: c,
                    getset: d
                };
            }();
        }, {} ],
        13: [ function(a, module, exports) {
            var b = a("consts");
            module.exports = function(a) {
                var c, d, e = a.getDatasByType(b.GEOMETRY);
                for (c = 0, d = e.length; d > c; c++) {
                    var f, g, h = e[c];
                    for (f = 0, g = h.subGeoms.length; g > f; f++) {
                        var i = h.subGeoms[f], j = i.getBuffersByType([ b.POSITION ])[0];
                        if (3 !== j.components) throw new Error("invalid number of components, should be 3, is " + j.components);
                        var k, l, m, n, o, p, q, r, s = j.data;
                        for (m = p = s[0], n = q = s[1], o = r = s[2], k = 3, l = s.length; l > k; k += 3) m = Math.min(m, s[k]), 
                        p = Math.max(p, s[k]), n = Math.min(n, s[k + 1]), q = Math.max(q, s[k + 1]), o = Math.min(o, s[k + 2]), 
                        r = Math.max(r, s[k + 2]);
                        var t = a.header.geoNrType, u = i.props;
                        u.expected[10] = u.expected[11] = u.expected[12] = u.expected[13] = u.expected[14] = u.expected[15] = t, 
                        u.set(10, m), u.set(11, n), u.set(12, o), u.set(13, p), u.set(14, q), u.set(15, r);
                    }
                }
            };
        }, {
            consts: 9
        } ],
        14: [ function(a, module, exports) {
            var b = a("consts");
            module.exports = function(a) {
                var c, d, e = a.getDatasByType(b.GEOMETRY);
                for (c = 0, d = e.length; d > c; c++) {
                    var f, g, h = e[c];
                    for (f = 0, g = h.subGeoms.length; g > f; f++) {
                        var i, j, k = h.subGeoms[f], l = k.getBuffersByType(b.INDEX);
                        for (i = 0, j = l.length; j > i; i++) {
                            var m, n, o, p = l[i], q = p.data;
                            for (m = 1, n = q.length; n > m; m += 3) o = q[m], q[m] = q[m + 1], q[m + 1] = o;
                        }
                    }
                }
            };
        }, {
            consts: 9
        } ],
        15: [ function(a, module, exports) {
            var b = a("consts");
            module.exports = function(a) {
                var c, d, e = a.getDatasByType(b.GEOMETRY);
                for (c = 0, d = e.length; d > c; c++) {
                    var f, g, h = e[c];
                    for (f = 0, g = h.subGeoms.length; g > f; f++) {
                        var i, j, k = h.subGeoms[f], l = k.getBuffersByType(b.UVS);
                        for (i = 0, j = l.length; j > i; i++) {
                            var m = l[i];
                            if (2 !== m.components) throw new Error("invalid number of components, should be 3, is " + m.components);
                            var n, o, p = m.data;
                            for (n = 1, o = p.length; o > n; n += 2) p[n] = 1 - p[n];
                        }
                    }
                }
            };
        }, {
            consts: 9
        } ],
        16: [ function(a, module, exports) {
            var b = a("consts");
            module.exports = function(a) {
                var c = a.getDatasByType(b.GEOMETRY);
                console.log(c.length);
                var d, e;
                for (d = 0, e = c.length; e > d; d++) {
                    var f, g, h = c[d];
                    for (f = 0, g = h.subGeoms.length; g > f; f++) {
                        var i, j, k = h.subGeoms[f], l = k.getBuffersByType([ b.POSITION, b.NORMAL, b.TANGENT ]);
                        for (i = 0, j = l.length; j > i; i++) {
                            var m = l[i];
                            if (3 !== m.components) throw new Error("invalid number of components, should be 3, is " + m.components);
                            var n, o, p = m.data;
                            for (n = 0, o = p.length; o > n; n += 3) p[n] = -p[n];
                        }
                    }
                }
            };
        }, {
            consts: 9
        } ],
        17: [ function(a, module, exports) {
            function b(a, b) {
                var c, d;
                for (c = 1, d = a.length; d > c; c++) a[c] = b[0] * a[c] + b[5];
            }
            function c(a, b) {
                var c, d;
                for (c = 1, d = a.length; d > c; c += 2) {
                    var e = a[c], f = a[c + 1];
                    a[c + 0] = b[0] * e + b[2] * f + b[5], a[c + 1] = b[6] * e + b[7] * f + b[10];
                }
            }
            function d(a, b) {
                var c, d;
                for (c = 1, d = a.length; d > c; c += 3) {
                    var e = a[c], f = a[c + 1], g = a[c + 2];
                    a[c + 0] = b[0] * e + b[2] * f + b[3] * g + b[5], a[c + 1] = b[6] * e + b[7] * f + b[8] * g + b[10], 
                    a[c + 2] = b[11] * e + b[12] * f + b[13] * g + b[15];
                }
            }
            function e(a, b) {
                var c, d;
                for (c = 1, d = a.length; d > c; c += 4) {
                    var e = a[c], f = a[c + 1], g = a[c + 2], h = a[c + 3];
                    a[c + 0] = b[0] * e + b[2] * f + b[3] * g + b[4] * h + b[5], a[c + 1] = b[6] * e + b[7] * f + b[8] * g + b[9] * h + b[10], 
                    a[c + 2] = b[11] * e + b[12] * f + b[13] * g + b[14] * h + b[15], a[c + 3] = b[16] * e + b[17] * f + b[18] * g + b[19] * h + b[20];
                }
            }
            var f = a("consts"), g = [ null, b, c, d, e ];
            module.exports = function(a, b, c) {
                var d, e, h, i, j, k, l = a.getDatasByType(f.GEOMETRY);
                for (d = 0, e = l.length; e > d; d++) {
                    var m = l[d];
                    for (h = 0, i = m.subGeoms.length; i > h; h++) {
                        var n = m.subGeoms[h], o = n.getBuffersByType(c);
                        for (j = 0, k = o.length; k > j; j++) {
                            var p = o[j], q = p.components, r = p.data;
                            if (1 > q || q > 4) throw new Error("invalid number of components, must be [1-4], is " + q);
                            g[q](r, b);
                        }
                    }
                }
            };
        }, {
            consts: 9
        } ],
        18: [ function(a, module, exports) {
            module.exports = {
                read: function(a) {
                    var b = a.U16();
                    return a.readUTFBytes(b);
                },
                write: function(a, b) {
                    b.U16(a.length), b.writeUTFBytes(a);
                },
                getUTFBytesLength: function(a) {
                    for (var b = 0, c = 0, d = a.length; d > c; c++) {
                        var e, f = a[c].codePointAt(0);
                        128 > f ? e = 1 : 2048 > f ? e = 2 : 65536 > f ? e = 3 : 2097152 > f && (e = 4), 
                        b += e;
                    }
                    return b;
                }
            };
        }, {} ],
        19: [ function(a, module, exports) {
            !function() {
                var a = function() {
                    this.data = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ];
                };
                a.prototype = {
                    read: function(a, b) {
                        this.parseMatrix43RawData(a, b, this.data);
                    },
                    write: void 0,
                    parseMatrix43RawData: function(a, b, c) {
                        var d = c, e = a.header.accuracyMatrix ? b.F64 : b.F32;
                        return d[0] = e.call(b), d[1] = e.call(b), d[2] = e.call(b), d[3] = 0, d[4] = e.call(b), 
                        d[5] = e.call(b), d[6] = e.call(b), d[7] = 0, d[8] = e.call(b), d[9] = e.call(b), 
                        d[10] = e.call(b), d[11] = 0, d[12] = e.call(b), d[13] = e.call(b), d[14] = e.call(b), 
                        d[15] = 1, isNaN(d[0]) && (d[0] = 1, d[1] = 0, d[2] = 0, d[4] = 0, d[5] = 1, d[6] = 0, 
                        d[8] = 0, d[9] = 0, d[10] = 1, d[12] = 0, d[13] = 0, d[14] = 0), d;
                    },
                    writeMatrix43RawData: void 0
                }, module.exports = a;
            }();
        }, {} ],
        20: [ function(a, module, exports) {
            !function() {
                var b = a("consts"), c = (a("types/awdString"), a("bufferWriter")), d = a("bufferReader"), e = function(a) {
                    this.expected = a, this.vars = {};
                };
                e.prototype = {
                    clone: function() {
                        var a = new c(64);
                        this.write(a);
                        var b = new e(this.expected);
                        return b.read(new d(a.buffer)), b;
                    },
                    read: function(a) {
                        var b = this.expected, c = a.U32(), d = a.ptr + c;
                        if (b) for (;a.ptr < d; ) {
                            var e, f = a.U16(), g = a.U32();
                            this.expected.hasOwnProperty(f) ? (e = b[f], this.set(f, this.parseAttrValue(e, g, a))) : a.ptr += g;
                        }
                        a.ptr !== d && (console.log("Warn Properties don't read entire data ", a.ptr, d, c), 
                        a.ptr = d);
                    },
                    write: void 0,
                    set: function(a, b) {
                        this.vars[a] = b;
                    },
                    get: function(a, b) {
                        return this.vars.hasOwnProperty(a) ? this.vars[a] : b;
                    },
                    writeAttrValue: void 0,
                    parseAttrValue: function(a, c, d) {
                        var e, f;
                        switch (a) {
                          case b.AWD_FIELD_INT8:
                            e = 1, f = d.I8;
                            break;

                          case b.AWD_FIELD_INT16:
                            e = 2, f = d.I16;
                            break;

                          case b.AWD_FIELD_INT32:
                            e = 4, f = d.I32;
                            break;

                          case b.AWD_FIELD_BOOL:
                          case b.AWD_FIELD_UINT8:
                            e = 1, f = d.U8;
                            break;

                          case b.AWD_FIELD_UINT16:
                            e = 2, f = d.U16;
                            break;

                          case b.AWD_FIELD_UINT32:
                          case b.AWD_FIELD_BADDR:
                            e = 4, f = d.U32;
                            break;

                          case b.AWD_FIELD_FLOAT32:
                            e = 4, f = d.F32;
                            break;

                          case b.AWD_FIELD_FLOAT64:
                            e = 8, f = d.F64;
                            break;

                          case b.AWD_FIELD_STRING:
                            var g = d.U16();
                            g === c && console.log("WARN may be Prefab bug / String property bug!!"), d.ptr -= 2;
                            var h = d.readUTFBytes(c);
                            return h;

                          case b.AWD_FIELD_VECTOR2x1:
                          case b.AWD_FIELD_VECTOR3x1:
                          case b.AWD_FIELD_VECTOR4x1:
                          case b.AWD_FIELD_MTX3x2:
                          case b.AWD_FIELD_MTX3x3:
                          case b.AWD_FIELD_MTX4x3:
                          case b.AWD_FIELD_MTX4x4:
                            e = 8, f = d.F64;
                        }
                        if (c > e) {
                            var i, j, k;
                            for (i = [], j = 0, k = c / e; k > j; ) i.push(f.call(d)), j++;
                            return i;
                        }
                        return f.call(d);
                    }
                }, module.exports = e;
            }();
        }, {
            bufferReader: 6,
            bufferWriter: 7,
            consts: 9,
            "types/awdString": 18
        } ],
        21: [ function(a, module, exports) {
            !function() {
                var b = a("consts"), c = a("types/awdString"), d = a("bufferWriter"), e = a("bufferReader"), f = function() {
                    this.attributes = {}, this._list = [];
                };
                f.prototype = {
                    clone: function() {
                        var a = new d(64);
                        this.write(a);
                        var b = new f();
                        return b.read(new e(a.buffer)), b;
                    },
                    addAttribute: function(a, b, c, d) {
                        var e = {
                            name: a,
                            value: b,
                            type: c,
                            ns: d
                        };
                        this.attributes[a] = e, this._list.push(e);
                    },
                    read: function(a) {
                        var d, e = a.U32();
                        if (e > 0) {
                            d = {};
                            for (var f = a.ptr + e; a.ptr < f; ) {
                                var g, h = a.U8(), i = c.read(a), j = a.U8(), k = a.U32();
                                switch (j) {
                                  case b.AWDSTRING:
                                    g = a.readUTFBytes(k);
                                    break;

                                  case b.INT8:
                                    g = a.I8();
                                    break;

                                  case b.INT16:
                                    g = a.I16();
                                    break;

                                  case b.INT32:
                                    g = a.I32();
                                    break;

                                  case b.BOOL:
                                  case b.UINT8:
                                    g = a.U8();
                                    break;

                                  case b.UINT16:
                                    g = a.U16();
                                    break;

                                  case b.UINT32:
                                  case b.BADDR:
                                    g = a.U32();
                                    break;

                                  case b.FLOAT32:
                                    g = a.F32();
                                    break;

                                  case b.FLOAT64:
                                    g = a.F64();
                                    break;

                                  default:
                                    g = "unimplemented attribute type " + j + "ns : " + h, a.ptr += k;
                                }
                                this.addAttribute(i, g, j, h), d[i] = g;
                            }
                        }
                        return d;
                    },
                    write: void 0
                }, module.exports = f;
            }();
        }, {
            bufferReader: 6,
            bufferWriter: 7,
            consts: 9,
            "types/awdString": 18
        } ],
        22: [ function(a, module, exports) {
            !function() {
                var b = a("consts"), c = a("types/properties"), d = function(a, b, c) {
                    this.x = a || 0, this.y = b || 0, this.z = c || 0;
                };
                d.prototype = {
                    parsePivot: function(a, d) {
                        var e = a.header.matrixNrType, f = new c({
                            1: e,
                            2: e,
                            3: e,
                            4: b.UINT8
                        });
                        f.read(d), this.x = f.get(1, 0), this.y = f.get(2, 0), this.z = f.get(3, 0);
                    },
                    writePivot: void 0
                }, module.exports = d;
            }();
        }, {
            consts: 9,
            "types/properties": 20
        } ],
        23: [ function(a, module, exports) {
            !function() {
                var b = (a("bufferWriter"), void 0);
                module.exports = b;
            }();
        }, {
            bufferWriter: 7
        } ],
        awdlib: [ function(a, module, exports) {
            var b = a("BaseElement"), c = a("DefaultElement"), d = a("Namespace"), e = a("awd"), f = a("bufferReader"), g = a("bufferWriter"), h = a("chunk"), i = a("consts"), j = a("extension"), k = a("header"), l = a("lang"), m = a("tools/computeBounds"), n = a("tools/flipFaces"), o = a("tools/flipUvsY"), p = a("tools/flipX"), q = a("tools/transform"), r = a("types/awdString"), s = a("types/matrix"), t = a("types/properties"), u = a("types/userAttr"), v = a("types/vec3"), w = a("writer"), x = {
                BaseElement: b,
                DefaultElement: c,
                Namespace: d,
                awd: e,
                bufferReader: f,
                bufferWriter: g,
                chunk: h,
                consts: i,
                extension: j,
                header: k,
                lang: l,
                computeBounds: m,
                flipFaces: n,
                flipUvsY: o,
                flipX: p,
                transform: q,
                awdString: r,
                matrix: s,
                properties: t,
                userAttr: u,
                vec3: v,
                writer: w
            };
            module.exports = x;
        }, {
            BaseElement: 2,
            DefaultElement: 3,
            Namespace: 4,
            awd: 5,
            bufferReader: 6,
            bufferWriter: 7,
            chunk: 8,
            consts: 9,
            extension: 10,
            header: 11,
            lang: 12,
            "tools/computeBounds": 13,
            "tools/flipFaces": 14,
            "tools/flipUvsY": 15,
            "tools/flipX": 16,
            "tools/transform": 17,
            "types/awdString": 18,
            "types/matrix": 19,
            "types/properties": 20,
            "types/userAttr": 21,
            "types/vec3": 22,
            writer: 23
        } ]
    }, {}, [])("awdlib");
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(_dereq_,module,exports){
var setupObj3D = _dereq_( './utils').setupObj3D;

module.exports = function( optx ){

  return function handleStruct( awdObj, lib, scene ){

    var gl = scene.gl;

    if( awdObj.lensType == 0 )
    {
      camera = new optx.Camera.PerspectiveCamera();
      camera.fov = awdObj.fov;
    }
    else
    {
      camera = new optx.Camera.OrthoCamera();
      camera.setViewport(
        awdObj.minX,
        awdObj.maxX,
        awdObj.minY,
        awdObj.maxY
      )
    }


    setupObj3D( camera, awdObj, lib );

    camera.nearPlane = awdObj.near
    camera.farPlane  = awdObj.far

    camera.post = lib.resolve( awdObj.post )

    return camera;
  }

}
},{"./utils":14}],4:[function(_dereq_,module,exports){
module.exports = function( optx ){

  return function handleStruct( awdObj, lib, scene ){

    var gl = scene.gl;


    var comps = []
    var acomps = awdObj.components
    for( var i=0; i<acomps.langth; i++ ){
      var c = acomps[i]
      comps.push({
        out :   c.out,
        comps : c.comps,
        tex   : lib.resolve( c.tex ),
      })
    }


    var tex = gl.textureCache.composite(
      comps,
      {}
    )

    return tex;

  }

}
},{}],5:[function(_dereq_,module,exports){
var setupObj3D = _dereq_( './utils').setupObj3D;

module.exports = function( optx ){

  return function handleStruct( awdObj, lib, scene ){

    var gl = scene.gl;

    env = new optx.Env()

    setupObj3D( env, awdObj, lib )

    env.envMap     = lib.resolve( awdObj.envMap )
    env.shCoefs    = awdObj.shCoefs
    env.brightness = awdObj.brightness

    return env;
  }

}
},{"./utils":14}],6:[function(_dereq_,module,exports){
module.exports = function( optx, awdlib ){



  return function handleStruct( awdObj, lib, scene ){

    var gl = scene.gl;


    var geom = new optx.Geometry( );

    geom.name = awdObj.name;

    var buffers = awdObj.vertexBuffers

    //
    // Vertex Buffers
    //
    for( var i = 0; i < buffers.length; i++ ){

      var vbuffer = buffers[i];
      var oVBuffer = new optx.VertexBuffer()
      //
      // Attribs
      //
      for( var j = 0; j < vbuffer.attributes.length; j++ ){

        var attrib = vbuffer.attributes[j]
        var oAttrib = new optx.VertexAttribute(
          attrib.name,
          attrib.numElems,
          attrib.glType,
          attrib.getFlag( awdlib.Geometry.VertexAttibute.FLAG_NORMALIZED )
        )

        oVBuffer.addAttribute( oAttrib );
      }

      geom.addVertexBuffer( oVBuffer );

    }

    //
    // Index Buffers
    //

    var buffers = awdObj.indexBuffers

    for( var i = 0; i < buffers.length; i++ ){

      var ibuffer = buffers[i];
      var oIBuffer = new optx.IndexBuffer( ibuffer.glType )
      oIBuffer.setData( ibuffer.data );
      oIBuffer.allocate( gl )

      switch( ibuffer.usage ){
        case awdlib.Geometry.IndexBuffer.TRIANGLE_USAGE:
          geom.indexBuffer = oIBuffer;
          break;
        case awdlib.Geometry.IndexBuffer.WIREFRAME_USAGE:
          geom.wireBuffer = oIBuffer;
          break;
        default :
          throw new Error( 'awd Geometry parsing error : unknown indexBuffer usage'+ ibuffer.usage )
      }

    }

    return geom;
  }

}
},{}],7:[function(_dereq_,module,exports){
awdLib        = _dereq_( 'awdlib/lib/awdlib_readonly' );
awdLib_optx   = _dereq_( 'awdlib/lib/awdlib_optx_readonly' )(awdLib);



var optx;
var handlers;


function initHandlers(  ){
  handlers = {
    handleComposite : _dereq_( './compositeTexture'  )( optx, awdLib_optx ),
    handleTexture   : _dereq_( './texture'  )( optx, awdLib_optx ),
    handleMaterial  : _dereq_( './material' )( optx, awdLib_optx ),
    handleGeometry  : _dereq_( './geometry' )( optx, awdLib_optx ),
    handleMesh      : _dereq_( './mesh'     )( optx, awdLib_optx ),
    handleLight     : _dereq_( './light'    )( optx, awdLib_optx ),
    handleCamera    : _dereq_( './camera'   )( optx, awdLib_optx ),
    handlePost      : _dereq_( './post'     )( optx, awdLib_optx ),
    handleSky       : _dereq_( './sky'      )( optx, awdLib_optx ),
    handleEnv       : _dereq_( './env'      )( optx, awdLib_optx )
  }

}


function getHandler( type, nsuri ){
  var EXT = awdLib_optx.extInfos;
  if( nsuri == EXT.URI ){

    switch( type ){
      case EXT.OPTX_GEOM             :
        return handlers.handleGeometry;

      case EXT.OPTX_MESH             :
        return handlers.handleMesh;

      case EXT.OPTX_MATERIAL         :
        return handlers.handleMaterial;

      case EXT.OPTX_TEXTURE          :
        return handlers.handleTexture;

      case EXT.OPTX_COMPOSITE_TEXTURE:
        return handlers.handleComposite;

      case EXT.OPTX_LIGHT            :
        return handlers.handleLight;

      case EXT.OPTX_ENV              :
        return handlers.handleEnv;

      case EXT.OPTX_SKY              :
        return handlers.handleSky;

      case EXT.OPTX_CAMERA           :
        return handlers.handleCamera;

      case EXT.OPTX_POST             :
        return handlers.handlePost;
    }

  }

  return null;
}


function _assertOptx(){
  if( ! optx ) {
    throw new Error( "optx-loader-awd bot initialized, call Loader.init( optx ).");
  }
}

function Loader( buffer ){
  _assertOptx();
  this.buffer = buffer;

  this.basedir = './';
  this.awd = null;


  var _lib = {};
  _lib.resolve = function( awdStruct ){
    if( awdStruct && _lib[awdStruct.id])
      return _lib[awdStruct.id];
    return null;
  }

  this._lib = _lib;
  this._byName = {}

}

Loader.prototype =
{

  load : function( scene )
  {
    this.awd = new awdLib.awd();
    this.awd.addExtension( awdLib_optx.ext.getExtension() );

    console.log( this.buffer.byteLength )

    this.awd.parse( this.buffer );
    console.log( this.buffer.byteLength )

    var structs = this.awd._elements;

    for( var i = 0; i< structs.length ; i++ ) {
      var struct = structs[i];

      console.log( struct.name, struct.nsUri, struct.type )

      var handler = getHandler( struct.type, struct.nsUri );
      if( handler ){
        var optxObj = handler( struct, this._lib, scene );
        this._lib[struct.id ] = optxObj;
        this._byName[struct.name] = optxObj;
      }

    }

  }
};

Loader.init = function( pOptx ){
  optx = pOptx;
  initHandlers();
};

module.exports = Loader;








},{"./camera":3,"./compositeTexture":4,"./env":5,"./geometry":6,"./light":8,"./material":9,"./mesh":10,"./post":11,"./sky":12,"./texture":13,"awdlib/lib/awdlib_optx_readonly":1,"awdlib/lib/awdlib_readonly":2}],8:[function(_dereq_,module,exports){
var setupObj3D = _dereq_( './utils').setupObj3D;

module.exports = function( optx ){

  return function handleStruct( awdObj, lib, scene ){

    var gl = scene.gl;

    if( awdObj.spotAngle == 0 ){
      light = new optx.Light.DirectionalLight();
    } else {
      light = new optx.Light.SpotLight();
    }

    setupObj3D( light, awdObj, lib );

    light.radius        = awdObj.radius
    light.falloffCurve  = awdObj.falloffCurve
    light.spotAngle     = awdObj.spotAngle
    light.spotSharpness = awdObj.spotSharpness

    light.castShadows = awdObj.shadow

    light.color.set( awdObj.color )

    return light;
  }

}
},{"./utils":14}],9:[function(_dereq_,module,exports){
var hexToRGB = _dereq_( './utils').hexToRGB;

module.exports = function( optx ){

  return function handleStruct( awdObj, lib, scene ){

    var gl = scene.gl;

    var fileData = awdObj.fileData,
        name      = awdObj.name,
        uri       = awdObj.uri;

    var mat = new optx.PBRMaterial();

    mat.name             = awdObj.name

    mat.blend            = awdObj.blend
    mat.alphaThreshold   = awdObj.alphaThreshold

    if( awdObj.dithering ) {
      mat.dithering        = awdObj.dithering
      mat.fresnel.fromArray( awdObj.fresnel )
      mat.horizonOcclude   = awdObj.horizonOcclude
      mat.vertexColor      = awdObj.vertexColor
      mat.vertexColorAlpha = awdObj.vertexColorAlpha
      mat.vertexColorSRGB  = awdObj.vertexColorSRGB
    }

    if( awdObj.aniso ) {
      mat.aniso            = awdObj.aniso
      mat.anisoStrength    = awdObj.anisoStrength
      mat.anisoIntegral    = awdObj.anisoIntegral
      mat.anisoTangent.fromArray( awdObj.anisoTangent )
    }

    if( awdObj.subsurface ) {
      mat.subSurfaceScattering = awdObj.subsurface
      mat.fresnelOcc           = awdObj.fresnelOcc
      mat.fresnelGlossMask     = awdObj.fresnelGlossMask
      mat.transSky             = awdObj.transSky
      mat.shadowBlur           = awdObj.shadowBlur
      mat.normalSmooth         = awdObj.normalSmooth
      mat.unlit                = awdObj.unlit

      mat.subsurfaceColor.fromArray( awdObj.subsurfaceColor )
      mat.transColor.fromArray(      awdObj.transColor )
      mat.fresnelColor.fromArray(    awdObj.fresnelColor )
    }


    mat.albedo       = lib.resolve( awdObj.textures.albedo       );
    mat.reflectivity = lib.resolve( awdObj.textures.reflectivity );
    mat.normal       = lib.resolve( awdObj.textures.normal       );
    mat.subsurface   = lib.resolve( awdObj.textures.subsurface   );
    mat.agt          = lib.resolve( awdObj.textures.agt          );


    mat.albedoColor       = hexToRGB( awdObj.colors.albedo       );
    mat.reflectivityColor = hexToRGB( awdObj.colors.reflectivity );
    mat.normalColor       = hexToRGB( awdObj.colors.normal       );
    mat.subsurfaceColor   = hexToRGB( awdObj.colors.subsurface   );
    mat.agtColor          = hexToRGB( awdObj.colors.agt          );

    return mat;
  }

}
},{"./utils":14}],10:[function(_dereq_,module,exports){
var setupObj3D = _dereq_( './utils').setupObj3D;

module.exports = function( optx ){

  return function handleStruct( awdObj, lib, scene ){

    var gl = scene.gl;

    var mesh = new optx.Mesh();
    var geom = lib.resolve( awdObj.geometry       );

    setupObj3D( mesh, awdObj, lib );

    mesh.geometry = geom;

    mesh.cullBackFaces = awdObj.getCullBackFace()
    mesh.castShadows   = awdObj.getCastShadows()

    var subs = awdObj.submeshes

    for (var j = 0; j < subs.length; ++j ) {
      var subData = subs[j]

      var mat =  lib.resolve( subData.material );
      mesh.setMaterialAt( mat, j );

      mesh.addSubmesh(
        subData.firstIndex    ,
        subData.indexCount    ,
        subData.firstWireIndex,
        subData.wireIndexCount
      );

    }

    return mesh;
  }

}
},{"./utils":14}],11:[function(_dereq_,module,exports){
var hexToRGB = _dereq_( './utils').hexToRGB;


var POST_SHARPEN     = 1,
    POST_BLOOM       = 2,
    POST_VIGNETTE    = 3,
    POST_SATURATION  = 4,
    POST_CONTRAST    = 5,
    POST_GRAIN       = 6,
    POST_REINHARD    = 7,
    POST_HEJL        = 8;


function addEffect( effect, data ){
  console.log( effect, effect.constructor.prototype )
  return;
  if     ( effect._id === POST_SHARPEN    ){
    data.sharpen       = effect.getAmount()
    data.sharpenLimit  = effect.getLimit()
  }
  else if( effect._id === POST_BLOOM      ){
    data.bloomColor    = effect.getColor()
    data.bloomSize     = effect.getSize()
  }
  else if( effect._id === POST_VIGNETTE   ){
    data.vignette      = effect.getColor()
    data.vignetteCurve = effect.getCurve()
  }
  else if( effect._id === POST_SATURATION ){
    data.saturation    = effect.getRgb()
  }
  else if( effect._id === POST_CONTRAST   ){
    data.saturation    = effect.getBrightness()
    data.brightness    = effect.getContrast()
    data.bias          = effect.getBias()
  }
  else if( effect._id === POST_GRAIN      ){
    data.grain         = effect.getAmount()
    data.grainSharpness= effect.getsharpness()
  }
  else if( effect._id === POST_REINHARD   ){
    data.toneMap = 1
  }
  else if( effect._id === POST_HEJL       ){
    data.toneMap = 2
  }
}


module.exports = function( optx ){

  return function handleStruct( awdObj, lib, scene ){

    var gl = scene.gl;

    var data = {}

    var effects = awdObj.effects

    for( var i=0; i< effects.length; i++ ){
      addEffect( effects[i], data )
    }

    var post = new optx.PostRender( data, true )

    return post;
  }

}
},{"./utils":14}],12:[function(_dereq_,module,exports){
var setupObj3D = _dereq_( './utils').setupObj3D;

module.exports = function( optx ){

  return function handleStruct( awdObj, lib, scene ){

    var gl = scene.gl;

    sky = new optx.Sky()

    setupObj3D( sky, awdObj, lib )

    var env     = lib.resolve( awdObj.env )

    //Sky.SKY_TYPE_SH
    //Sky.SKY_TYPE_ENV

    var useSH = awdObj.skyType === 0

    sky.fromEnv( env, useSH );

    return sky;
  }

}
},{"./utils":14}],13:[function(_dereq_,module,exports){
module.exports = function( optx ){

  return function handleStruct( awdObj, lib, scene ){

    var gl = scene.gl;

    var fileData = awdObj.fileData,
        name      = awdObj.name,
        uri       = awdObj.uri,
        infos     = awdObj.infos;

    var tex = null;

    var glFormat = infos.glformat

    // todo do some sanity check
    // if filedata is raw , width and height must be available

    var params = {}
    if( infos.width )
      params.width = infos.width
    if( infos.height )
      params.height = infos.height


    if( fileData ){
      var data = new Uint8Array( fileData.data.buffer, fileData.data.byteOffset, fileData.data.byteLength )
      fileData.data = data;
      tex = gl.textureCache.fromData( fileData, params, glFormat );
    }
    else {
      throw new Error( 'TODO - handle externa uri in awd' )
    }

    return tex;
  }

}
},{}],14:[function(_dereq_,module,exports){
module.exports = {

  hexToRGB : function( hex ){
    return [
      ((hex>>>16)&0xFF) / 0xFF,
      ((hex>>>8 )&0xFF) / 0xFF,
      ((hex>>>0 )&0xFF) / 0xFF
    ]
  },


  setupObj3D : function( optxObj, awdObj, lib ){
    optxObj.transform.set( awdObj.matrix )
    optxObj.name = awdObj.name;

    // todo pivot?

    if( awdObj.parent ){
      var op = lib.resolve( awdObj.parent )
      op.add( optxObj )
    }
  }

}
},{}]},{},[7])(7)
});