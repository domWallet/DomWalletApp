// withPatchPackage.js
const { withPlugins, withDangerousMod } = require('@expo/config-plugins');

const withPatchPackage = (config) => {
    return withPlugins(config, [[withDangerousMod, {
        mod: 'android.gradle',
        data: (gradle) => {
            // 在 android/build.gradle 中添加 postinstall 脚本
            const script = `
        allprojects {
          gradle.projectsEvaluated {
            def npm = System.getProperty("os.name").toLowerCase().contains("windows") ? "npm.cmd" : "npm"
            exec {
              commandLine npm, 'run', 'postinstall'
            }
          }
        }
      `;
            return gradle.replace('allprojects {', `allprojects { ${script}`);
        },
    }]]);
};

module.exports = withPatchPackage;