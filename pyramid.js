const  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("pyramid"),
    alpha: true,  
  });
  const  camera = new THREE.PerspectiveCamera(50, 1, 1, 1000);
  camera.position.z = 500;

  const scene = new THREE.Scene();
  const geometry = new THREE.CylinderGeometry(1, 200, 220, 4);
  const material = new THREE.MeshPhongMaterial({
    color: 0x000000,
    polygonOffset: true,
    polygonOffsetFactor: 1, // positive value pushes polygon further away
    polygonOffsetUnits: 1
  });

  const mesh = new THREE.Mesh(geometry, material);

  var geo = new THREE.EdgesGeometry( mesh.geometry ); // or WireframeGeometry
  var mat = new THREE.LineBasicMaterial( { color: 0xff00ff, linewidth: 1 } );
  var wireframe = new THREE.LineSegments( geo, mat );
  mesh.add( wireframe );

  scene.add(mesh);

  function resizeCanvasToDisplaySize(force) {
    const canvas = renderer.domElement;
    const width = 300;
    const height = 300;
    if (force || canvas.width !== width ||canvas.height !== height) {
      // you must pass false here or three.js sadly fights the browser
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // set render target sizes here
    }
  }

  function animate(time) {
    resizeCanvasToDisplaySize();

    mesh.rotation.y = time * 0.00015;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);