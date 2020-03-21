part of flutter_bluetooth_serial;

class BluetoothDiscoveryResult {
  final BluetoothDevice device;
  final int rssi;

  BluetoothDiscoveryResult({
    this.device,
    this.rssi = 0,
  });

  factory BluetoothDiscoveryResult.fromMap(Map map) {
    //  {bondState: 10, rssi: -67, address: B4:EF:39:F7:83:C8, name: Bruno Augusto, isConnected: false, type: 1}
    return BluetoothDiscoveryResult(
      device: BluetoothDevice.fromMap(map),
      rssi: map['rssi'] ?? 0,
    );
  }
}
