<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <h1>Metadaten-Editor</h1>
    </v-row>

    <v-row>
      <v-col>
      <v-switch
      label="Alle Felder anzeigen"
      v-model="bShowExtendedView"
      ></v-switch>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="align-center">
        <v-card class="pa-5">
          <v-text-field label="Titel" v-model="entry.name">
            <template v-slot:prepend>
              <v-tooltip right :max-width="toolTipMaxWidth">
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                </template>
                {{ popover.name }}
              </v-tooltip>
            </template>
          </v-text-field>

          <v-textarea label="Beschreibung" v-model="entry.about">
            <template v-slot:prepend>
              <v-tooltip right :max-width="toolTipMaxWidth">
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                </template>
                {{ popover.about }}
              </v-tooltip>
            </template>
          </v-textarea>

          <v-menu
            ref="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="entry.dateCreated"
                label="Wann wurde das Material erstellt?"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="entry.dateCreated" @input="menu = false"></v-date-picker>
          </v-menu>

          <!-- Autorin -->

          <v-text-field label="Autor:in" v-model="entry.author">
            <template v-slot:prepend>
              <v-tooltip right :max-width="toolTipMaxWidth">
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                </template>
                {{ popover.author }}
              </v-tooltip>
            </template>
          </v-text-field>

          <!-- Publisher -->

          <v-text-field v-if="bShowExtendedView" label="Herausgeber:in" v-model="entry.publisher">
            <template v-slot:prepend>
              <v-tooltip right :max-width="toolTipMaxWidth">
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                </template>
                {{ popover.publisher }}
              </v-tooltip>
            </template>
          </v-text-field>

          <!-- inLanguage -->

          <v-text-field v-if="bShowExtendedView" label="Sprache" v-model="entry.inLanguage">
            <template v-slot:prepend>
              <v-tooltip right :max-width="toolTipMaxWidth">
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                </template>
                {{ popover.inLanguage }}
              </v-tooltip>
            </template>
          </v-text-field>

          <!-- Accessibility API -->

          <v-select
            v-if="bShowExtendedView"
            :items="accessibilityAPIOptions"
            label="Accessbility Api "
            multiple
            v-model="entry.accessibilityAPI"
            chips
            deletable-chips
            clearable
          >
            <template v-slot:prepend>
              <v-tooltip right :max-width="toolTipMaxWidth">
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                </template>
                {{ popover.accessibilityAPI }}
              </v-tooltip>
            </template>
          </v-select>

          <!-- Accessibility Control -->

          <v-select
            v-if="bShowExtendedView"
            :items="accessibilityControlOptions"
            label="Accessbility Control "
            multiple
            v-model="entry.accessibilityControl"
            chips
            deletable-chips
            clearable
          >
            <template v-slot:prepend>
              <v-tooltip right :max-width="toolTipMaxWidth">
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                </template>
                {{ popover.accessibilityControl }}
              </v-tooltip>
            </template>
          </v-select>

          <!-- Accessibility Feature -->

          <v-select
            v-if="bShowExtendedView"
            :items="accessibilityFeatureOptions"
            label="Accessbility Feature "
            multiple
            v-model="entry.accessibilityFeature"
            chips
            deletable-chips
            clearable
          >
            <template v-slot:prepend>
              <v-tooltip right :max-width="toolTipMaxWidth">
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                </template>
                {{ popover.accessibilityFeature }}
              </v-tooltip>
            </template>
          </v-select>

          <!-- Accessibility Hazard -->

          <v-select
            v-if="bShowExtendedView"
            :items="accessibilityHazardOptions"
            label="Accessbility Hazard "
            multiple
            v-model="entry.accessibilityHazard"
            chips
            deletable-chips
            clearable
          >
            <template v-slot:prepend>
              <v-tooltip right :max-width="toolTipMaxWidth">
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                </template>
                {{ popover.accessibilityHazard }}
              </v-tooltip>
            </template>
          </v-select>

          <!-- URL -->

          <v-text-field label="Url" v-model="entry.url">
            <template v-slot:prepend>
              <v-tooltip right :max-width="toolTipMaxWidth">
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                </template>
                {{ popover.url }}
              </v-tooltip>
            </template>
          </v-text-field>

          <!-- License -->

          <v-select
            label="Lizenz auswählen"
            v-model="entry.license"
            :items="licenseOptions"
            item-text="text"
            item-value="value"
          >
            <template v-slot:prepend>
              <v-tooltip right :max-width="toolTipMaxWidth">
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                </template>
                {{ popover.license }}
              </v-tooltip>
            </template>
          </v-select>

          <!-- educational Frameworks -->

          <v-expansion-panels hover v-if="bShowExtendedView">
            <v-expansion-panel>
              <v-expansion-panel-header>
                <span>
                  <v-tooltip right :max-width="toolTipMaxWidth">
                    <template v-slot:activator="{ on }">
                      <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                    </template>
                    {{ popover.educationalFramework }}
                  </v-tooltip>
                  Rahmenlehrpläne einblenden
                </span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div class="text-center">
                  <v-progress-circular
                    v-if="!competenceFrameworks"
                    indeterminate
                  >
                  </v-progress-circular>
                </div>
                <v-treeview
                  v-if="competenceFrameworks"
                  :items="competenceFrameworks"
                  item-text="label"
                  item-children="children"
                  item-key="id"
                  multiple-active
                  open-on-click
                  selectable
                  hoverable
                  v-model="selectedCompetencies"
                  return-object
                >
                  <template v-slot:label="{ item }">
                    <v-tooltip right :max-width="toolTipMaxWidth">
                      <template v-slot:activator="{ on }">
                        <span v-on="on" v-text="item.label"></span>
                      </template>
                      <span>{{ item.fullStatement }}</span>
                    </v-tooltip>
                  </template>
                </v-treeview>
                <template v-if="!selectedCompetencies.length">
                  No nodes selected.
                </template>
                <template v-else>
                  <div v-for="node in selectedCompetencies" :key="node.id">
                    {{ node.label }}
                  </div>
                </template>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <!-- Learning Resource Type -->
          <v-select
            :items="learningResourceTypeOptions"
            label="Bitte (mind.) einen Ressource-Typen auswählen"
            multiple
            v-model="entry.learningResourceType"
            chips
            deletable-chips
            clearable
          >
            <template v-slot:prepend>
              <v-tooltip right :max-width="toolTipMaxWidth">
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                </template>
                {{ popover.learningResourceType }}
              </v-tooltip>
            </template>
          </v-select>

          <!-- timeRequired -->

          <v-text-field
            label="Benötigte Zeit (in Minuten)"
            v-model="entry.timeRequired"
          >
            <template v-slot:prepend>
              <v-tooltip right :max-width="toolTipMaxWidth">
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                </template>
                {{ popover.timeRequired }}
              </v-tooltip>
            </template>
          </v-text-field>

          <!-- educational Role -->

          <v-select
            :items="educationalRoleOptions"
            label="Wer ist die Zielgruppe für das Material? "
            multiple
            v-model="entry.educationalRole"
            chips
            deletable-chips
            clearable
          >
            <template v-slot:prepend>
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                </template>
                {{ popover.educationalRole }}
              </v-tooltip>
            </template>
          </v-select>

          <!-- educational Use -->

          <v-select
            v-if="bShowExtendedView"
            :items="educationalUseOptions"
            label="Welchen Zweck hat das Material? "
            multiple
            v-model="entry.educationalUse"
            chips
            deletable-chips
            clearable
          >
            <template v-slot:prepend>
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                </template>
                {{ popover.educationalUse }}
              </v-tooltip>
            </template>
          </v-select> 

          <!-- typicalAgeRange -->

          <v-text-field
            v-if="bShowExtendedView"
            label="Welches Alter hat die Zielgruppe?"
            v-model="entry.typicalAgeRange"
          >
            <template v-slot:prepend>
              <v-tooltip right :max-width="toolTipMaxWidth">
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                </template>
                {{ popover.typicalAgeRange }}
              </v-tooltip>
            </template>
          </v-text-field>


          <!-- interactivityType -->

          <v-select
            v-if="bShowExtendedView"
            :items="interactivityTypeOptions"
            label="Welcher Aktivitätsmodus herrscht bei der Bearbetung des Materials vor? "
            multiple
            v-model="entry.interactivityType"
            chips
            deletable-chips
            clearable
          >
            <template v-slot:prepend>
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                </template>
                {{ popover.interactivityType }}
              </v-tooltip>
            </template>
          </v-select> 

          <!-- isBasedOnURL -->

          <v-text-field label="Basiert auf der Ressource unter URL:" v-model="entry.isBasedOnUrl">
            <template v-slot:prepend>
              <v-tooltip right :max-width="toolTipMaxWidth">
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                </template>
                {{ popover.isBasedOnUrl }}
              </v-tooltip>
            </template>
          </v-text-field>
        </v-card>
      </v-col>
    </v-row>

    <!-- BUILD BUTTONS -->

    <v-row>
      <v-col>
        <v-card class="pa-5">
          <v-checkbox
            label="Eintrag an Elasticsearch-Instanz senden"
            v-model="bSendToElasticsearch"
          >
          </v-checkbox>
          <div v-if="bSendToElasticsearch">
            <p>
              Falls der Eintrag an eine Elasticsearch-Instanz gesendet werden
              soll, trage hier die entsprechenden Daten ein:
            </p>
            <v-text-field
              label="Url des Elastic-Search-Index"
              v-model="esData.url"
            ></v-text-field>
            <v-text-field
              label="Name des Elastic-Search-Index"
              v-model="esData.index"
            ></v-text-field>
            <v-select
              label="Autorisierungsmethode wählen"
              :items="authorizationOptions"
              v-model="selectedAuthorizationOption"
            ></v-select>
            <div v-if="selectedAuthorizationOption">
              <v-text-field
                v-if="selectedAuthorizationOption == 'Authorization-Header'"
                label="Bitte Authorization-Header eingeben"
                v-model="esData.header"
              >
              </v-text-field>
              <div v-else>
                <v-row>
                  <v-text-field
                    class="pa-2"
                    label="Username"
                    v-model="esData.username"
                  ></v-text-field>
                  <v-text-field
                    class="pa-2"
                    label="Password"
                    v-model="esData.password"
                    :append-icon="bShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required]"
                    :type="bShowPassword ? 'text' : 'password'"
                    name="pw-input"
                    @click:append="bShowPassword = !bShowPassword"
                  ></v-text-field>
                </v-row>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row align="center" justify="center">
      <v-col>
        <v-card>
          <v-btn @click="logEntry">Log Entry</v-btn>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
      <v-col>
        <v-card>
          <v-btn @click="buildJsonLd">Build JSON-LD</v-btn>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
      <v-col>
        <v-card>
          <v-btn @click="passToIndex(esData)">Pass to Index</v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-textarea
      name="json-ld-output"
      filled
      label="JSON-LD Output"
      auto-grow
      :value="lrmi_text"
    ></v-textarea>
  </v-container>
</template>

<script>
import apiClient from '../axios';
import esClient from '../axios';

export default {
  name: 'AppEditor',
  data() {
    return {
      bShowTreeView: false,
      bShowExtendedView: false,
      bLearningResourceTypeOptions: false,
      bShowPassword: false,
      bSendToElasticsearch: false,
      esData: {
        url: '',
        index: '',
        header: '',
        username: '',
        password: ''
      },
      rules: {
        required: value => !!value || 'Pflichtfeld.'
      },
      entry: {
        name: null,
        about: null,
        dateCreated: null,
        author: null,
        publisher: null,
        inLanguage: null,
        accessibilityAPI: [],
        accessibilityControl: null,
        accessibilityFeature: null,
        accessibilityHazard: null,
        license: null,
        timeRequired: null,
        educationalRole: null,
        alignmentType: null,
        educationalFramework: null,
        targetDescription: null,
        targetName: null,
        targetURL: null,
        educationalUse: null,
        typicalAgeRange: null,
        interactivityType: null,
        learningResourceType: [],
        isBasedOnUrl: null,
        url: null,
        thumbnail: '',
        tags: '',
        project: '',
        source: 'Mein Index',
        spider: '',
        // TODO insert current date in correct format
        date_scraped: null
      },
      popover: {
        name:
          '<span>Ein eindeutiger Name, um das Material aufzufinden. <br> <a target="_blank" href="https://schema.org/name">Definition </a> auf Schema.org</span>',
        about:
          'Eine Beschreibung, die den Menschen hilft, den Zweck des Materials zu verstehen. <br> <a target="_blank" href="https://schema.org/about">Definition </a> auf Schema.org',
        author:
          'Name der Person oder Organisation, die das Material erstellt hat. <br> <a target="_blank" href="https://schema.org/author">Definition </a> auf Schema.org',
        publisher:
          'Name der Person oder Organisation, die das Material herausgegeben hat. <br> <a target="_blank" href="https://schema.org/publisher">Definition </a> auf Schema.org',
        inLanguage:
          'Die Sprache in der das Material verfasst ist. <br> <a target="_blank" href="https://schema.org/inLanguage">Definition </a> auf Schema.org',
        accessibilityAPI:
          'Indicates that the resource is compatible with the referenced accessibility API. <br> <a target="_blank" href="https://schema.org/accessibilityAPI">Definition </a> auf Schema.org',
        accessibilityControl:
          'Identifies input methods that are sufficient to fully control the described resource. <br> <a target="_blank" href="https://schema.org/accessibilityControl">Definition </a> auf Schema.org',
        accessibilityFeature:
          'Content features of the resource, such as accessible media, alternatives and supported enhancements for accessibility. <br> <a target="_blank" href="https://schema.org/accessibilityFeature">Definition </a> auf Schema.org',
        license: 'Bitte eine Lizenz auswählen',
        accessibilityHazard:
          'A characteristic of the described resource that is physiologically dangerous to some users. Related to WCAG 2.0 guideline 2.3. <br> <a target="_blank" href="https://schema.org/accessibilityHazard">Definition </a> auf Schema.org',
        timeRequired:
          'Approximate or typical time it takes to work with or through this learning resource for the typical intended target audience. <br> <a target="_blank" href="https://schema.org/timeRequired">Definition </a> auf Schema.org',
        educationalRole:
          'The role that describes the target audience of the content. Note: schema.org/EducationalAudience is a subtype of Schema.org/Audience. <br> <a target="_blank" href="https://schema.org/educationalRole">Definition </a> auf Schema.org <br> <a target="_blank" href="https://www.dublincore.org/specifications/lrmi/concept_schemes/#educational-audience-role" >Definition</a> des Vokabulars. ',
        educationalAlignment:
          'An alignment to an established educational framework. <br> <a target="_blank" href="https://schema.org/educationalAlignment">Definition </a> auf Schema.org',
        alignmentType:
          'A category of alignment between the learning resource and the framework node. Recommended values include: "assesses", "teaches", "requires", "textComplexity", "readingLevel", "educationalSubject", and "educationalLevel". <br> <a target="_blank" href="https://schema.org/educationalAlignment">Definition </a> auf Schema.org',
        educationalFramework:
          'The framework to which the resource being described is aligned. <br> <a target="_blank" href="https://schema.org/educationalFramework">Definition </a> auf Schema.org',
        targetDescription:
          'The description of a node in an established educational framework. <br> <a target="_blank" href="https://schema.org/targetDescription">Definition </a> auf Schema.org',
        targetName:
          'The name of a node in an established educational framework. <br> <a target="_blank" href="https://schema.org/targetName">Definition </a> auf Schema.org',
        targetURL:
          'The URL of a node in an established educational framework. <br> <a target="_blank" href="https://schema.org/targetURL">Definition </a> auf Schema.org',
        educationalUse:
          'The purpose of a work in the context of education; for example, "assignment", "group work". <br> <a target="_blank" href="https://schema.org/educationalUse">Definition </a> auf Schema.org',
        typicalAgeRange:
          'The typical expected age range, e.g. "7-9", "11-". <br> <a target="_blank" href="https://schema.org/typicalAgeRange">Definition </a> auf Schema.org',
        interactivityType:
          'The predominant mode of learning supported by the learning resource. Acceptable values are "active", "expositive", or "mixed". <br> <a target="_blank" href="https://schema.org/interactivityType">Definition </a> auf Schema.org',
        learningResourceType:
          'The predominant type or kind characterizing the learning resource. For example, "presentation", "handout". <br> <a target="_blank" href="https://schema.org/learningResourceType">Definition </a> auf Schema.org',
        isBasedOnUrl:
          'A resource that was used in the creation of this resource. This term can be repeated for multiple sources. For example, http://example.com/great-multiplication-intro.html. <br> <a target="_blank" href="https://schema.org/isBasedOnUrl">Definition </a> auf Schema.org',
        url: 'A link to the resource.'
      },
      authorizationOptions: [
        'Authorization-Header',
        'Username:Password'
      ],
      licenseOptions: [
        { value: null, text: 'Bitte eine Lizenz auswählen', definition: 'Infotext' },
        { value: 'CC 0', text: 'CC 0', definition: 'Infotext' },
        { value: 'CC BY', text: 'CC BY', definition: 'Infotext' },
        { value: 'CC BY-SA', text: 'CC BY-SA', definition: 'Infotext' },
        { value: 'CC BY-SA-NC', text: 'CC BY-SA-NC', definition: 'Infotext' },
        { value: 'CC BY-ND', text: 'CC BY-ND', definition: 'Infotext' }
      ],
      accessibilityAPIOptions: [
        { value: 'AndroidAccessibility', text: 'AndroidAccessibility'},
        { value: 'ARIA', text: 'ARIA' },
        { value: 'ATK', text: 'ATK' },
        { value: 'AT-SPI', text: 'AT-SPI' },
        { value: 'BlackberryAccessibility', text: 'BlackberryAccessibility' },
        { value: 'iAccessible2', text: 'iAccessible2' },
        { value: 'iOSAccessibility', text: 'iOSAccessibility' },
        { value: 'JavaAccessibility', text: 'JavaAccessibility' },
        { value: 'MacOSXAccessibility', text: 'MacOSXAccessibility' },
        { value: 'MSAA', text: 'MSAA' },
        { value: 'UIAutomation', text: 'UIAutomation' }
      ],
      accessibilityControlOptions: [
        { value: 'Full Keyboard Control', text: 'Full Keyboard Control'},
        { value: 'Full Mouse Control', text: 'Full Mouse Control'},
        { value: 'Full Switch Control', text: 'Full Switch Control'},
        { value: 'Full Touch Control', text: 'Full Touch Control'},
        { value: 'Full Video Control', text: 'Full Video Control'},
        { value: 'Full Voice Control', text: 'Full Voice Control'},
      ],
      accessibilityFeatureOptions: [
        { value: 'alternativeText', text: 'alternativeText' },
        { value: 'annotations', text: 'annotations' },
        { value: 'audioDescription', text: 'audioDescription' },
        { value: 'bookmarks', text: 'bookmarks' },
        { value: 'braille', text: 'braille' },
        { value: 'captions', text: 'captions' },
        { value: 'ChemML', text: 'ChemML' },
        { value: 'describedMath', text: 'describedMath' },
        { value: 'displayTransformability', text: 'displayTransformability' },
        { value: 'highContrastAudio', text: 'highContrastAudio' },
        { value: 'highContrastDisplay', text: 'highContrastDisplay' },
        { value: 'index', text: 'index' },
        { value: 'largePrint', text: 'largePrint' },
        { value: 'latex', text: 'latex' },
        { value: 'longDescription', text: 'longDescription' },
        { value: 'MathML', text: 'MathML' },
        { value: 'none', text: 'none' },
        { value: 'printPageNumbers', text: 'printPageNumbers' },
        { value: 'readingOrder', text: 'readingOrder' },
        { value: 'rubyAnnotations', text: 'rubyAnnotations' },
        { value: 'signLanguage', text: 'signLanguage' },
        { value: 'structuralNavigation', text: 'structuralNavigation' },
        { value: 'synchronizedAudioText', text: 'synchronizedAudioText' },
        { value: 'tableOfContents', text: 'tableOfContents' },
        { value: 'taggedPDF', text: 'taggedPDF' },
        { value: 'tactileGraphic', text: 'tactileGraphic' },
        { value: 'tactileObject', text: 'tactileObject' },
        { value: 'timingControl', text: 'timingControl' },
        { value: 'transcript', text: 'transcript' },
        { value: 'ttsMarkup', text: 'ttsMarkup' },
        { value: 'unlocked', text: 'unlocked' }
      ],
      accessibilityHazardOptions: [
        { value: 'flashing', text: 'flashing' },
        { value: 'noFlashingHazard', text: 'noFlashingHazard' },
        { value: 'motionSimulation', text: 'motionSimulation' },
        { value: 'noMotionSimulationHazard', text: 'noMotionSimulationHazard' },
        { value: 'sound', text: 'sound' },
        { value: 'noSoundHazard', text: 'noSoundHazard' },
        { value: 'unknown', text: 'unknown' },
        { value: 'none', text: 'none' }
      ],
      lrmi_text: '',
      competenceFrameworks: null,
      selectedCompetencies: [],
      selectedAuthorizationOption: null,
      educationalRoleOptions: [],
      alignmentTypeOptions: [],
      educationalUseOptions: [],
      learningResourceTypeOptions: [],
      interactivityTypeOptions: [],
      toolTipMaxWidth: '400px'
    };
  },
  methods: {
    logEntry() {
      console.log(this.entry);
    },
    buildString(selected, isCompetence = 0) {
      var input_string = '"null"';
      if (selected == null) {
        return input_string;
      } else if (selected.length == 0) {
        return input_string;
      } else if (selected.length == 1 && isCompetence == 0) {
        input_string = '"' + selected + '"';
        return input_string;
      // we get selected Competencies passed
      } else if (selected.length >= 1 && isCompetence == 1) {
        input_string = '\t';
        selected.forEach(e => {
          const strType = '\n \t { \n \t \t "@type": "AlignmentObject", \n \t';
          const strAlignmentType = '\t "alignmentType": "' + this.entry.alignmentType + '"\n \t';
          const strEducationalFramework = '\t "educationalFramework": "' + e.educationalFramework + '"\n \t';
          const strTargetName = '\t "targetName": "' + e.label + '"\n \t';
          const strTargetUrl = '\t "targetUrl": "' + this.$store.state.openSaltUrl + '/' +  e.id + '" \n \t },';
          input_string += strType;
          input_string += strAlignmentType;
          input_string += strEducationalFramework;
          input_string += strTargetName;
          input_string += strTargetUrl;
        });
        input_string += '';
        return input_string;
      } else {
        input_string = '[ \n \t \t \t';
        selected.forEach(e => {
          var str = '"' + e + '"\n \t \t \t';
          input_string += str;
        });
        input_string += ']';
        return input_string;
      }
    },
    buildJsonLd() {
      this.lrmi_text =
        '<script type="application/ld+json"> \n' +
        '{ \n \t' +
        '"@context": "http://schema.org/", \n \t' +
        '"@type": "CreativeWork", \n \t' +
        '"name": "' + this.entry.name + '", \n \t' +
        '"about": "' + this.entry.about.replace(/(\r\n|\n|\r)/gm, " ") + '", \n \t' +
        '"author": "' + this.entry.author + '", \n \t' +
        '"publisher": "' + this.entry.publisher + '", \n \t' +
        '"inLanguage": "' + this.entry.inLanguage + '", \n \t' +
        '"accessibilityAPI": ' + this.buildString(this.entry.accessibilityAPI) + ', \n \t' +
        '"accessibilityControl": ' + this.buildString(this.entry.accessibilityControl) + ', \n \t' +
        '"accessibilityFeature": ' + this.buildString(this.entry.accessibilityFeature) + ', \n \t' +
        '"accessibilityHazard": ' + this.buildString(this.entry.accessibilityHazard) + ', \n \t' +
        '"license": "' + this.entry.license + '", \n \t' +
        '"timeRequired": "' + this.entry.timeRequired + '", \n \t' +
        '"audience": { \n \t \t' +
        '"@type": "EducationalAudience" \n \t \t' +
        '"educationalRole": ' + this.buildString(this.entry.educationalRole) + ', \n \t' +
        '}, \n \t' +
        '"educationalAlignment": [' + this.buildString(this.selectedCompetencies, 1) +' \n \t \t' +
        '], \n \t' +
        '"educationalUse: ' + this.buildString(this.entry.educationalUse) + ', \n \t' +
        '"typicalAgeRange": "' + this.entry.typicalAgeRange + '", \n \t' +
        '"interactivityType": ' + this.buildString(this.entry.interactivityType) + ', \n \t' +
        '"learningResourceType": ' + this.buildString(this.entry.learningResourceType) + ', \n \t' +
        '"isBasedOnUrl": "' + this.entry.isBasedOnUrl + '", \n \t' +
        '"url": "' + this.entry.url + '", \n' +
        '} \n ' +
        // eslint-disable-next-line no-useless-escape
        '<\/script>';
    },
    getCompetenceFrameworks() {
      apiClient.competenceFrameworks
        .getFrameworks()
        .then(res => {
          this.competenceFrameworks = res.data.frameworks;
          console.log(this.competenceFrameworks);
        })
        .catch(error => {
          console.error(error);
        });
    },
    getSkos(vocab) {
      apiClient.vocabs
        .getVocab(vocab)
        .then(res => {
          res.data.vocabs.forEach(e => {
            if (vocab == "educationalRole") {
              this.educationalRoleOptions.push({'value': e.label, 'text': e.label, 'definition': e.description})
            } else if (vocab == "alignmentType") {
              this.alignmentTypeOptions.push({'value': e.label, 'text': e.label, 'definition': e.description})
            } else if (vocab == "educationalUse") {
              this.educationalUseOptions.push({'value': e.label, 'text': e.label, 'definition': e.description})
            } else if (vocab == "learningResourceType") {
              this.learningResourceTypeOptions.push({'value': e.label, 'text': e.label, 'definition': e.description});
              this.bLearningResourceTypeOptions = true;
            } else if (vocab == "interactivityType") {
              this.interactivityTypeOptions.push({'value': e.label, 'text': e.label, 'definition': e.description})
          }
        })
       })
       .catch((error) => {
         console.error(error);
         
       })
    },
    passToIndex(esData) {
      console.log(esData);
      esClient.passToIndex
        .postData(esData, this.entry)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.error(error);
        })
    }
  },
  created() {
    this.getSkos("educationalRole");
    this.getSkos("alignmentType");
    this.getSkos("educationalUse");
    this.getSkos("learningResourceType");
    this.getSkos("interactivityType");
    this.getCompetenceFrameworks();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button.v-expansion-panel-header {
  padding: 0px;
}
</style>
