<template>
  <div ref="three"></div>
</template>

<script lang="ts">
// https://wow.techbrood.com/fiddle/38828
import { Component, Mixins, Prop, Vue } from 'vue-property-decorator';
import * as THREE from 'three';
import TrackballControls from 'three-trackballcontrols';

export interface Country {
  name: string;
  position: [number, number]; // 经纬度 [经度（东经为正数，西经为负数），纬度（北纬为正数，南纬为负数）]
}

const countries: Array<Country> = [
  {
    name: '中国',
    position: [116.2, 39.55],
  },
];

@Component
export default class GanttComponent extends Mixins(Vue) {
  scene!: THREE.Scene; // 场景
  camera!: THREE.PerspectiveCamera; // 透视相机
  renderer!: THREE.WebGLRenderer; // 渲染器
  clock!: THREE.Clock;
  control!: any; // 控制器

  imageEl!: HTMLImageElement; // 背景图
  imageCanvas!: HTMLCanvasElement; // 背景图画布
  imageCanvasContext!: CanvasRenderingContext2D | null; // 背景图画布上下文
  imageData!: ImageData; //背景图数据

  earthParticles: THREE.Object3D = new THREE.Object3D(); // 地球粒子
  cloud = new THREE.Object3D(); // 云层
  coordinates: THREE.Object3D = new THREE.Object3D(); // 坐标
  mounted() {
    // 直接刷新页面，页面布局可能还未完成就进到此方法中，所以使用setTimeout等待布局完成获取元素真实宽高
    setTimeout(() => {
      this.imageEl = document.createElement('img');
      this.imageEl.src = '/assets/threejs/earth.jpg';
      this.imageEl.onload = () => {
        this.imageCanvas = document.createElement('canvas');
        this.imageCanvasContext = this.imageCanvas.getContext('2d');
        this.imageCanvas.width = this.imageEl.width;
        this.imageCanvas.height = this.imageEl.height;
        if (this.imageCanvasContext) {
          this.imageCanvasContext.drawImage(
            this.imageEl,
            0,
            0,
            this.imageEl.width,
            this.imageEl.height
          );
          this.imageData = this.imageCanvasContext.getImageData(
            0,
            0,
            this.imageEl.width,
            this.imageEl.height
          );
        }

        this.initScene();
        // this.initSphere();
        this.initEarthParticles();
        this.initCloud();

        for (let i = 0, length = countries.length; i < length; i++) {
          const position = this.createPosition(countries[i].position);
          this.initCountries(position); // 地标
        }

        this.animate();
      };
    }, 0);
  }

  initScene() {
    this.scene = new THREE.Scene();
    const width = this.$el.clientWidth;
    const height = this.$el.clientHeight;
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
    this.camera.position.z = 400;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    // this.renderer.autoClearColor = new THREE.Color(1, 0, 0, 0);

    (this.$refs['three'] as HTMLElement).appendChild(this.renderer.domElement);

    this.clock = new THREE.Clock();
    // 控制器
    this.control = new TrackballControls(this.camera, this.renderer.domElement);
    this.control.rotateSpeed = 1.0; // 旋转的速度，其默认值为1.0。
    this.control.zoomSpeed = 1.0; // 缩放的速度，其默认值为1.2。
    this.control.panSpeed = 1.0; // 平移的速度，其默认值为0.3。
    this.control.minDistance = 200;
    this.control.maxDistance = 400;
    this.control.noPan = true;
  }

  // 初始化球面
  initSphere() {
    const sphereGeom = new THREE.SphereGeometry(100, 20, 20);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x03d98e,
      wireframe: true,
    });
    const sphere = new THREE.Mesh(sphereGeom, sphereMat);
    this.scene.add(sphere);
  }

  initCountries(position: any) {
    const hexagonLine = new THREE.CircleGeometry(5, 6);
    const hexagonPlane = new THREE.CircleGeometry(4, 6);
    const vertices = hexagonLine.vertices;
    vertices.shift(); // 第一个节点是中心点
    const circleLineGeom = new THREE.Geometry();
    circleLineGeom.vertices = vertices;
    const materialLine = new THREE.MeshBasicMaterial({
      color: '#ffff00',
      side: THREE.DoubleSide,
    });
    const materialPlane = new THREE.MeshBasicMaterial({
      color: '#ffff00',
      side: THREE.DoubleSide,
      opacity: 0.5,
    });
    const circleLine = new THREE.LineLoop(circleLineGeom, materialLine);
    const circlePlane = new THREE.Mesh(hexagonPlane, materialPlane);
    circleLine.position.copy(position);
    circlePlane.position.copy(position);
    circlePlane.lookAt(new THREE.Vector3(0, 0, 0));
    circleLine.lookAt(new THREE.Vector3(0, 0, 0));
    this.coordinates.add(circleLine);
    this.coordinates.add(circlePlane);
    this.scene.add(this.coordinates);
  }

  /**
   * 初始化地球粒子
   */
  initEarthParticles() {
    const particles: any = [];
    const materials = [];
    // 分成2组地球坐标点集合，用于地球粒子颜色变换
    for (let i = 0; i < 2; i++) {
      particles[i] = {
        positions: [],
        sizes: [],
      };
      const mat: any = new THREE.PointsMaterial();
      mat.size = 5;
      mat.color = new THREE.Color(0x03d98e);
      mat.map = new THREE.TextureLoader().load('/assets/threejs/dot.png');
      mat.depthWrite = false;
      mat.transparent = true;
      mat.opacity = 0;
      mat.side = THREE.FrontSide;
      mat.blending = THREE.AdditiveBlending;
      const n = i / 2;
      mat.userData.t = n * Math.PI * 2;
      mat.userData.speed = 0.05;
      mat.userData.min = 0.2 * Math.random() + 0.5;
      mat.userData.delta = 0.1 * Math.random() + 0.1;
      mat.userData.opacity = 1;
      materials.push(mat);
    }
    const spherical = new THREE.Spherical(); // 球坐标
    spherical.radius = 100;
    const step = 250;
    for (let i = 0; i < step; i++) {
      const vec = new THREE.Vector3(); // 三维向量
      const radians =
        (step * (1 - Math.sin((i / step) * Math.PI))) / step + 0.5; // 每个纬线圈内的角度均分
      for (let j = 0; j < step; j += radians) {
        const c = j / step, // 底图上的横向百分比
          f = i / step, // 底图上的纵向百分比
          index = Math.floor(2 * Math.random());
        const pos = particles[index];
        const size = particles[index];
        if (this.isLandByUV(c, f)) {
          // 根据横纵百分比判断在底图中的像素值
          spherical.theta = c * Math.PI * 2 - Math.PI / 2; // 横纵百分比转换为theta和phi夹角
          spherical.phi = f * Math.PI; // 横纵百分比转换为theta和phi夹角
          vec.setFromSpherical(spherical); // 夹角转换为世界坐标
          pos.positions.push(vec.x);
          pos.positions.push(vec.y);
          pos.positions.push(vec.z);
          if (j % 3 === 0) {
            size.sizes.push(6.0);
          }
        }
      }
    }
    for (let i = 0; i < particles.length; i++) {
      const pos = particles[i],
        size = particles[i],
        bufferGeom = new THREE.BufferGeometry(),
        typedArr1 = new Float32Array(pos.positions.length),
        typedArr2 = new Float32Array(size.sizes.length);
      for (let j = 0; j < pos.positions.length; j++) {
        typedArr1[j] = pos.positions[j];
      }
      for (let j = 0; j < size.sizes.length; j++) {
        typedArr2[j] = size.sizes[j];
      }
      bufferGeom.setAttribute(
        'position',
        new THREE.BufferAttribute(typedArr1, 3)
      );
      bufferGeom.setAttribute('size', new THREE.BufferAttribute(typedArr2, 1));
      bufferGeom.computeBoundingSphere();
      const particle = new THREE.Points(bufferGeom, materials[i]);
      this.earthParticles.add(particle);
    }
    this.scene.add(this.earthParticles);
  }

  reRender() {
    const delta = this.clock.getDelta();
    this.control.update(delta);
    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    // 球面粒子闪烁
    const objects = this.earthParticles.children;
    objects.forEach((obj: any) => {
      const material = obj.material;
      material.userData.t += material.userData.speed;
      material.opacity =
        (Math.sin(material.userData.t) * material.userData.delta +
          material.userData.min) *
        material.userData.opacity;
      material.needsUpdate = true;
    });
    this.reRender();
  }

  private isLandByUV(c: number, f: number) {
    if (!this.imageData) {
      // 底图数据
      console.error('data error!');
    }
    const n = parseInt(this.imageEl.width * c + ''); // 根据横纵百分比计算图象坐标系中的坐标
    const o = parseInt(this.imageEl.height * f + ''); // 根据横纵百分比计算图象坐标系中的坐标
    return 0 === this.imageData.data[4 * (o * this.imageData.width + n)]; // 查找底图中对应像素点的rgba值并判断
  }

  private resize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  /**
   * 获取图层位置
   * @param lnglat 经纬度
   */
  private createPosition(lnglat: any) {
    const spherical = new THREE.Spherical();
    spherical.radius = 100;
    const lng = lnglat[0];
    const lat = lnglat[1];
    // const phi = (180 - lng) * (Math.PI / 180)
    // const theta = (90 + lat) * (Math.PI / 180)
    const theta = (lng + 90) * (Math.PI / 180);
    const phi = (90 - lat) * (Math.PI / 180);
    spherical.phi = phi;
    spherical.theta = theta;
    const position = new THREE.Vector3();
    position.setFromSpherical(spherical);
    return position;
  }

  /**
   * 初始化云层
   */
  private initCloud() {
    const XRayMaterial = function (options: any) {
      let uniforms = {
        uTex: {
          type: 't',
          value: options.map || new THREE.Texture(),
        },
        offsetRepeat: {
          value: new THREE.Vector4(0, 0, 1, 1),
        },
        alphaProportion: {
          type: '1f',
          value: options.alphaProportion || 0.5,
        },
        diffuse: {
          value: options.color || new THREE.Color(16777215),
        },
        opacity: {
          value: options.opacity || 1,
        },
        gridOffset: {
          value: 0,
        },
      };
      return new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: ` 
          varying float _alpha;
          varying vec2 vUv;
          uniform vec4 offsetRepeat;
          uniform float alphaProportion;
          void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          vUv = uv * offsetRepeat.zw + offsetRepeat.xy;
          vec4 worldPosition = modelMatrix * vec4( vec3( position ), 1.0 );
          vec3 cameraToVertex = normalize( cameraPosition - worldPosition.xyz);
          _alpha = 1.0 - max( 0.0, dot( normal, cameraToVertex ) );
          _alpha = max( 0.0, (_alpha - alphaProportion) / (1.0 - alphaProportion) );
        }`,
        fragmentShader: `
          uniform sampler2D uTex;
          uniform vec3 diffuse;
          uniform float opacity;
          uniform float gridOffset;
          varying float _alpha;
          varying vec2 vUv;
          void main() {
          vec4 texColor = texture2D( uTex, vUv );
          float _a = _alpha * opacity;
          if( _a <= 0.0 ) discard;
          _a = _a * ( sin( vUv.y * 2000.0 + gridOffset ) * .5 + .5 );
          gl_FragColor = vec4( texColor.rgb * diffuse, _a );
        }`,
        transparent: !0,
        blending: THREE.AdditiveBlending,
        depthTest: !1,
      });
    };
    const geometry = new THREE.SphereGeometry(1.3 * 100, 66, 44);
    const map = new THREE.TextureLoader().load('/assets/threejs/clouds.jpg');
    map.wrapT = THREE.ClampToEdgeWrapping;
    map.wrapS = THREE.ClampToEdgeWrapping;
    const material = XRayMaterial({
      map: map,
      alphaProportion: 0.25,
      color: new THREE.Color(263385797),
      opacity: 0,
      gridOffsetSpeed: 0.6,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.matrixAutoUpdate = !1;
    this.cloud.add(mesh);
    this.scene.add(this.cloud);
  }
}
</script>