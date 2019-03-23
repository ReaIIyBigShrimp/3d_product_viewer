// Global scope
var scene, camera, renderer;
// Cube Object
var cube, material, mesh;
function init() {
    // Use DOM to gain access to login div
    var loginDiv = document.getElementById('loginDiv');
    var h = loginDiv.offsetHeight;
    var w = loginDiv.offsetWidth;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, w/h, 0.1, 1000);
    camera.position.set(0,0,30);
    // Object constraint for the camera to face towards. 
    cameraTarget = new THREE.Vector3(0,0,0);
    camera.lookAt(cameraTarget);
    // Can also use:
    // camera.lookAt(new THREE.Vector3(0,0,0));
    // But cameraTarget could be utilised in the future
    scene.add(camera);
    console.log('Adding mesh to scene...');
    //cube = new THREE.CubeGeometry(5,5,5);
    // Torus geometry
    // 6 arguments
    console.log("Creating torus geometry...");
    torus = new THREE.TorusKnotGeometry(8, 1.5, 64, 16, 2, 3);
    material = new THREE.MeshBasicMaterial({color: 0xfffff, wireframe: true});
    console.log('Wireframing enabled...');
    mesh = new THREE.Mesh(torus, material);
    scene.add(mesh);
    console.log('Setting mesh position...');
    mesh.position.set(0,0,0);
    // Sphere
    // Returns warning. Not an error, so woo!
    //blenderMaterial = new THREE.MeshFaceMaterial({color: 0xffffff});
    // Fine, I'll use an array instead.
    // Note - Find a way to mount materials to mesh
    blenderMaterials = [];
    blenderMaterials[0] = new THREE.MeshFaceMaterial();
    // Append more materials soon.
    console.log("Defining global variables...");
    var model, sphereModel;
    function sceneSetup() {
        // LIGHTS 
        // ------
        // Ambient light #1
        var ambientLight = new THREE.AmbientLight(0x111111);
        scene.add(ambientLight);
        // Point light #1
        var light = new THREE.PointLight(0xFFFFDD);
        light.position.set(-15,10,15);
        scene.add(light);
    }
    sceneSetup();

    var controls = new THREE.OrbitControls( camera );
    // Create renderer
    console.log('Adding renderer to scene...');
    renderer = new THREE.WebGLRenderer({alpha: true});
    console.log('Sizing window...');
    // Height & width of div
    renderer.setSize(h, w);
    // Add renderer to DOM
    console.log('Appending to DOM...');
    // Append to login element
    loginDiv.appendChild(renderer.domElement);
    animate();
};
// Animation 
// Updates every frame
function animate(){
    requestAnimationFrame(animate);
    //mesh.rotation.x += 0.01;
    //mesh.rotation.y += 0.01;
    // Render the scene every frame.
    //console.log('Rotating cube...');
    // Needs to be here, so that the background is continuously updated.
    renderer.setClearColor( 0x123456 );
    renderer.render(scene, camera);
    controls.update();
};