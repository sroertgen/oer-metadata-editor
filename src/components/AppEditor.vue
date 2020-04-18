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
                  <v-btn icon :href="popover.name.link" target="_blank">
                    <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                  </v-btn>
                </template>
                {{ popover.name.definition }}
              </v-tooltip>
            </template>
          </v-text-field>

          <v-textarea label="Beschreibung" v-model="entry.about">
            <template v-slot:prepend>
              <v-tooltip right :max-width="toolTipMaxWidth">
                <template v-slot:activator="{ on }">
                  <v-btn icon :href="popover.about.link" target="_blank">
                    <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                  </v-btn>
                </template>
                {{ popover.about.definition }}
              </v-tooltip>
            </template>
          </v-textarea>

          <div class="pl-2">
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
              <v-date-picker
                v-model="entry.dateCreated"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
          </div>
          <!-- Autorin -->

          <v-text-field label="Autor:in" v-model="entry.author">
            <template v-slot:prepend>
              <v-tooltip right :max-width="toolTipMaxWidth">
                <template v-slot:activator="{ on }">
                  <v-btn icon :href="popover.author.link" target="_blank">
                    <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                  </v-btn>
                </template>
                {{ popover.author.definition }}
              </v-tooltip>
            </template>
          </v-text-field>

          <!-- Publisher -->

          <v-text-field
            v-if="bShowExtendedView"
            label="Herausgeber:in"
            v-model="entry.publisher"
          >
            <template v-slot:prepend>
              <v-tooltip right :max-width="toolTipMaxWidth">
                <template v-slot:activator="{ on }">
                  <v-btn icon :href="popover.publisher.link" target="_blank">
                    <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                  </v-btn>
                </template>
                {{ popover.publisher.definition }}
              </v-tooltip>
            </template>
          </v-text-field>

          <!-- inLanguage -->

          <v-text-field
            v-if="bShowExtendedView"
            label="Sprache"
            v-model="entry.inLanguage"
          >
            <template v-slot:prepend>
              <v-tooltip right :max-width="toolTipMaxWidth">
                <template v-slot:activator="{ on }">
                  <v-btn icon :href="popover.inLanguage.link" target="_blank">
                    <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                  </v-btn>
                </template>
                {{ popover.inLanguage.definition }}
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
                  <v-btn
                    icon
                    :href="popover.accessibilityAPI.link"
                    target="_blank"
                  >
                    <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                  </v-btn>
                </template>
                {{ popover.accessibilityAPI.definition }}
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
                  <v-btn
                    icon
                    :href="popover.accessibilityControl.link"
                    target="_blank"
                  >
                    <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                  </v-btn>
                </template>
                {{ popover.accessibilityControl.definition }}
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
                  <v-btn
                    icon
                    :href="popover.accessibilityFeature.link"
                    target="_blank"
                  >
                    <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                  </v-btn>
                </template>
                {{ popover.accessibilityFeature.definition }}
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
                  <v-btn
                    icon
                    :href="popover.accessibilityHazard.link"
                    target="_blank"
                  >
                    <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                  </v-btn>
                </template>
                {{ popover.accessibilityHazard.definition }}
              </v-tooltip>
            </template>
          </v-select>

          <!-- URL -->

          <v-text-field label="Url" v-model="entry.url">
            <template v-slot:prepend>
              <v-tooltip right :max-width="toolTipMaxWidth">
                <template v-slot:activator="{ on }">
                  <v-btn icon :href="popover.url.link" target="_blank">
                    <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                  </v-btn>
                </template>
                {{ popover.url.definition }}
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
                  <v-btn icon :href="popover.license.link" target="_blank">
                    <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                  </v-btn>
                </template>
                {{ popover.license.definition }}
              </v-tooltip>
            </template>
          </v-select>

          <!-- educational Frameworks -->

          <!-- <v-expansion-panels hover v-if="bShowExtendedView"> -->
          <v-expansion-panels flat hover>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <span>
                  <v-tooltip right :max-width="toolTipMaxWidth">
                    <template v-slot:activator="{ on }">
                      <v-btn
                        icon
                        :href="popover.educationalFramework.link"
                        target="_blank"
                      >
                        <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                      </v-btn>
                    </template>
                    {{ popover.educationalFramework.definition }}
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
                  <v-btn
                    icon
                    :href="popover.learningResourceType.link"
                    target="_blank"
                  >
                    <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                  </v-btn>
                </template>
                {{ popover.learningResourceType.definition }}
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
                  <v-btn icon :href="popover.timeRequired.link" target="_blank">
                    <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                  </v-btn>
                </template>
                {{ popover.timeRequired.definition }}
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
              <v-tooltip right :max-width="toolTipMaxWidth">
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    :href="popover.educationalRole.link"
                    target="_blank"
                  >
                    <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                  </v-btn>
                </template>
                {{ popover.educationalRole.definition }}
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
              <v-tooltip right :max-width="toolTipMaxWidth">
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    :href="popover.educationalUse.link"
                    target="_blank"
                  >
                    <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                  </v-btn>
                </template>
                {{ popover.educationalUse.definition }}
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
                  <v-btn
                    icon
                    :href="popover.typicalAgeRange.link"
                    target="_blank"
                  >
                    <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                  </v-btn>
                </template>
                {{ popover.typicalAgeRange.definition }}
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
              <v-tooltip right :max-width="toolTipMaxWidth">
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    :href="popover.interactivityType.link"
                    target="_blank"
                  >
                    <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                  </v-btn>
                </template>
                {{ popover.interactivityType.definition }}
              </v-tooltip>
            </template>
          </v-select> 

          <!-- isBasedOnURL -->

          <v-text-field
            label="Basiert auf der Ressource unter URL:"
            v-model="entry.isBasedOnUrl"
          >
            <template v-slot:prepend>
              <v-tooltip right :max-width="toolTipMaxWidth">
                <template v-slot:activator="{ on }">
                  <v-btn icon :href="popover.isBasedOnUrl.link" target="_blank">
                    <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                  </v-btn>
                </template>
                {{ popover.isBasedOnUrl.definition }}
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
        <v-btn @click="logEntry">Log Entry</v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col>
        <v-btn @click="buildJsonLd">Build JSON-LD</v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col>
        <v-btn @click="passToIndex(esData)">Pass to Index</v-btn>
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
        name: '',
        about: '',
        dateCreated: '',
        author: '',
        publisher: '',
        inLanguage: '',
        accessibilityAPI: [],
        accessibilityControl: '',
        accessibilityFeature: '',
        accessibilityHazard: '',
        license: '',
        timeRequired: '',
        educationalRole: '',
        alignmentType: '',
        educationalFramework: '',
        targetDescription: '',
        targetName: '',
        targetURL: '',
        educationalUse: '',
        typicalAgeRange: '',
        interactivityType: '',
        learningResourceType: [],
        isBasedOnUrl: '',
        url: '',
        thumbnail: '',
        tags: '',
        project: '',
        source: 'Mein Index',
        spider: '',
        // TODO insert current date in correct format
        date_scraped: ''
      },
      popover: {
        name: {
          definition: 'Ein eindeutiger Name, um das Material aufzufinden.', link: 'https://schema.org/name'},
        about: {
          definition: 'Eine Beschreibung, die den Menschen hilft, den Zweck des Materials zu verstehen.', link: 'https://schema.org/about'},
        author: {
          definition: 'Name der Person oder Organisation, die das Material erstellt hat.', link: 'https://schema.org/author'},
        publisher: {
          definition: 'Name der Person oder Organisation, die das Material herausgegeben hat.', link: 'https://schema.org/publisher'},
        inLanguage: {
          definition: 'Die Sprache in der das Material verfasst ist.', link: 'https://schema.org/inLanguage'},
        accessibilityAPI: {
          definition: 'Indicates that the resource is compatible with the referenced accessibility API.', link: 'https://schema.org/accessibilityAPI'},
        accessibilityControl: {
          definition: 'Identifies input methods that are sufficient to fully control the described resource.', link: 'https://schema.org/accessibilityControl'},
        accessibilityFeature: {
          definition: 'Content features of the resource, such as accessible media, alternatives and supported enhancements for accessibility.', link: 'https://schema.org/accessibilityFeature'},
        license: {
          definition: 'Bitte eine Lizenz auswählen', link: 'https://schema.org/license'},
        accessibilityHazard: {
          definition: 'A characteristic of the described resource that is physiologically dangerous to some users. Related to WCAG 2.0 guideline 2.3.', link: 'https://schema.org/accessibilityHazard'},
        timeRequired: {
          definition: 'Approximate or typical time it takes to work with or through this learning resource for the typical intended target audience.', link: 'https://schema.org/timeRequired'},
        educationalRole: {
          definition: 'The role that describes the target audience of the content. Note: schema.org/EducationalAudience is a subtype of Schema.org/Audience.', link: 'https://schema.org/educationalRole'},
        educationalAlignment: {
          definition: 'An alignment to an established educational framework.', link: 'https://schema.org/educationalAlignment'},
        alignmentType: {
          definition: 'A category of alignment between the learning resource and the framework node. Recommended values include: "assesses", "teaches", "requires", "textComplexity", "readingLevel", "educationalSubject", and "educationalLevel".', link: 'https://schema.org/educationalAlignment'},
        educationalFramework: {
          definition: 'The framework to which the resource being described is aligned.', link: 'https://schema.org/educationalFramework'},
        targetDescription: {
          definition: 'The description of a node in an established educational framework.', link: 'https://schema.org/targetDescription'},
        targetName: {
          definition: 'The name of a node in an established educational framework.', link: 'https://schema.org/targetName'},
        targetURL: {
          definition: 'The URL of a node in an established educational framework.', link: 'https://schema.org/targetURL'},
        educationalUse: {
          definition: 'The purpose of a work in the context of education; for example, "assignment", "group work".', link: 'https://schema.org/educationalUse'},
        typicalAgeRange: {
          definition: 'The typical expected age range, e.g. "7-9", "11-".', link: 'https://schema.org/typicalAgeRange'},
        interactivityType:{
          definition: 'The predominant mode of learning supported by the learning resource. Acceptable values are "active", "expositive", or "mixed".', link: 'https://schema.org/interactivityType'},
        learningResourceType:{
          definition: 'The predominant type or kind characterizing the learning resource. For example, "presentation", "handout".', link: 'https://schema.org/learningResourceType'},
        isBasedOnUrl: {
          definition:
            'A resource that was used in the creation of this resource. This term can be repeated for multiple sources. For example, http://example.com/great-multiplication-intro.html.',
          link: 'https://schema.org/isBasedOnUrl'
        },
        url: {
          definition: 'A link to the resource.', link: 'https://schema.org/url'}
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
      var input_string = '""';
      if (selected == null && isCompetence == 0) {
        return input_string;
      } else if (selected.length == 0 && isCompetence == 0) {
        return input_string;
      } else if (selected.length == 1 && isCompetence == 0) {
        input_string = '"' + selected + '"';
        return input_string;
      // we get selected Competencies passed
      } else if (selected.length == 0 && isCompetence == 1) {
        input_string = '"",';
        return input_string;
      } else if (selected.length >= 1 && isCompetence == 1) {
        input_string = '[ \t';
        selected.forEach(e => {
          const strType = '\n \t { \n \t \t "@type": "AlignmentObject", \n \t';
          const strAlignmentType = '\t "alignmentType": "' + this.entry.alignmentType + '",\n \t';
          const strEducationalFramework = '\t "educationalFramework": "' + e.educationalFramework + '",\n \t';
          const strTargetName = '\t "targetName": "' + e.label + '",\n \t';

          input_string += strType;
          input_string += strAlignmentType;
          input_string += strEducationalFramework;
          input_string += strTargetName;

          if (selected.lastIndexOf(e) == selected.length - 1) {
            const strTargetUrl = '\t "targetUrl": "' + this.$store.state.openSaltUrl + '/' +  e.id + '" \n \t }';
            input_string += strTargetUrl;
          } else {
            const strTargetUrl = '\t "targetUrl": "' + this.$store.state.openSaltUrl + '/' +  e.id + '" \n \t },';
            input_string += strTargetUrl;
          }
        });
        input_string += '],';
        return input_string;
      } else {
        input_string = '[ \n \t \t \t';
        selected.forEach(e => {
          if (selected.lastIndexOf(e) == selected.length - 1) {
            const str = '"' + e + '"\n \t \t \t';
            input_string += str;
          } else {
            const str = '"' + e + '",\n \t \t \t';
            input_string += str;
          }
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
        '"@type": "EducationalAudience", \n \t \t' +
        '"educationalRole": ' + this.buildString(this.entry.educationalRole) + ' \n \t' +
        '}, \n \t' +
        '"educationalAlignment": ' + this.buildString(this.selectedCompetencies, 1) +' \n \t \t' +
        ' \n \t' +
        '"educationalUse": ' + this.buildString(this.entry.educationalUse) + ', \n \t' +
        '"typicalAgeRange": "' + this.entry.typicalAgeRange + '", \n \t' +
        '"interactivityType": ' + this.buildString(this.entry.interactivityType) + ', \n \t' +
        '"learningResourceType": ' + this.buildString(this.entry.learningResourceType) + ', \n \t' +
        '"isBasedOnUrl": "' + this.entry.isBasedOnUrl + '", \n \t' +
        '"url": "' + this.entry.url + '" \n' +
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
            const value = e.label[0]['@value'];
            if (vocab == "educationalRole") {
              this.educationalRoleOptions.push({'value': value, 'text': value, 'definition': e.description})
            } else if (vocab == "alignmentType") {
              this.alignmentTypeOptions.push({'value': value, 'text': value, 'definition': e.description})
            } else if (vocab == "educationalUse") {
              this.educationalUseOptions.push({'value': value, 'text': value, 'definition': e.description})
            } else if (vocab == "learningResourceType") {
              this.learningResourceTypeOptions.push({'value': value, 'text': value, 'definition': e.description});
              this.bLearningResourceTypeOptions = true;
            } else if (vocab == "interactivityType") {
              this.interactivityTypeOptions.push({'value': value, 'text': value, 'definition': e.description})
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
