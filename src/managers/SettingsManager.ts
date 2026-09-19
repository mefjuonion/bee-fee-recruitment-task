class SettingsManager {
  public static readonly instance = new SettingsManager();

  public readonly playerSizeRatio = 0.25;

  public readonly itemSizeRatio = 0.06;

  public readonly backgroundColor = 0x1e272e;
  public readonly scoreItemFallSpeed = 100;
}

export default SettingsManager;