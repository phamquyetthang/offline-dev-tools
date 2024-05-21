import type { ForgeConfig } from '@electron-forge/shared-types'
import { MakerSquirrel } from '@electron-forge/maker-squirrel'
// import { MakerZIP } from "@electron-forge/maker-zip";
import { MakerDeb } from '@electron-forge/maker-deb'
// import { MakerRpm } from "@electron-forge/maker-rpm";
import { MakerDMG } from '@electron-forge/maker-dmg'
import { PublisherGithub } from '@electron-forge/publisher-github'

import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives'
import { WebpackPlugin } from '@electron-forge/plugin-webpack'
import { FusesPlugin } from '@electron-forge/plugin-fuses'
import { FuseV1Options, FuseVersion } from '@electron/fuses'

import { mainConfig } from './webpack.main.config'
import { rendererConfig } from './webpack.renderer.config'

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    icon: './src/lib/images/icon.png'
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      description: 'Offline Dev Tools',
      name: 'offline-dev-tools',
      authors: 'Pham Quyet Thang',
      setupExe: 'offline-dev-tools.exe'
    }),
    // new MakerZIP({}, ["darwin"]),
    // new MakerRpm({}),
    new MakerDeb({
      options: {
        name: 'Offline Dev Tools',
        icon: './src/lib/images/icon.png',
        productName: 'Offline Dev Tools'
      }
    }),
    new MakerDMG({
      format: 'ULFO',
      name: 'offline-dev-tools'
    })
  ],
  publishers: [
    new PublisherGithub({
      repository: {
        owner: 'phamquyetthang',
        name: 'offline-dev-tools'
      },
      draft: true
    })
  ],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/index.html',
            js: './src/renderer.ts',
            name: 'main_window',
            preload: {
              js: './src/preload.ts'
            }
          }
        ]
      }
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true
    })
  ]
}

export default config
