import React from "react";

const Donaciones = () => {
  return (
    <div className="px-8 py-10 space-y-16">
      {/* Planes de ayuda económica */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Planes de ayuda económica</h2>
        <div className="grid md:grid-cols-2 gap-8 justify-items-center">
          <div className="text-center space-y-4">
            <div className="w-48 h-48 bg-gray-300">Imagen de perrito</div>
            <p>Descripción del plan de apadrinamiento (10 soles mensuales).</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">10 soles mensuales</button>
          </div>
          <div className="text-center space-y-4">
            <div className="w-48 h-48 bg-gray-300">Imagen de perrito</div>
            <p>Descripción del plan de apadrinamiento (30 soles mensuales).</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">30 soles mensuales</button>
          </div>
        </div>
      </section>

      {/* Explicación de fondos */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Explicación de fondos</h2>
        <div className="grid md:grid-cols-3 gap-8 justify-items-center">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="text-center space-y-2">
              <div className="w-40 h-40 bg-gray-300">Imagen de perrito</div>
              <p>Explicación corta sobre el uso de los fondos {i + 1}.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Donación libre */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Donación libre</h2>
        <div className="flex justify-around items-start flex-wrap gap-6">
          <div className="text-center">
            <div className="w-28 h-28 bg-gray-300 mx-auto">QR Yape</div>
            <p>Yape</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-48 h-48 bg-gray-300 mx-auto">Imagen de perrito</div>
            <p>Descripción breve para incentivar donación libre.</p>
            <p className="text-sm">Cuentas bancarias</p>
          </div>
          <div className="text-center">
            <div className="w-28 h-28 bg-gray-300 mx-auto">QR Plin</div>
            <p>Plin</p>
          </div>
        </div>
      </section>

      {/* Productos en venta */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Productos en venta</h2>
        <div className="grid md:grid-cols-4 gap-6 justify-items-center">
          {[1, 2, 3, 4].map((_, i) => (
            <div key={i} className="text-center space-y-2">
              <div className="w-36 h-36 bg-gray-300">Imagen de merch</div>
              <p>Descripción del producto {i + 1}</p>
              <button className="bg-green-500 text-white px-4 py-2 rounded">Comprar</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Donaciones;
